"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { weatherStore } from "@/stores/weather-store";
import moment from "moment";
import { fetchWeatherApi } from "openmeteo";
import { toast } from "sonner";

const FormSchema = z.object({
  dateRange: z
    .object({
      from: z.date({
        required_error: "Start date is required.",
      }),
      to: z.date({
        required_error: "End date is required.",
      }),
    })
    .refine((data) => data.from && data.to, {
      message: "Both start and end dates are required.",
    })
    .refine((data) => data.from <= data.to, {
      message: "The start date must be before the end date.",
    }),
  latitude: z
    .number({
      required_error: "Latitude is required.",
    })
    .min(-90, { message: "Latitude must be at least -90." })
    .max(90, { message: "Latitude must be at most 90." }),
  longitude: z
    .number({
      required_error: "Longitude is required.",
    })
    .min(-180, { message: "Longitude must be at least -180." })
    .max(180, { message: "Longitude must be at most 180." }),
  tag: z
    .string({
      required_error: "Tag is required.",
    })
    .max(10, {
      message: "tag not be more then 10 characters.",
    }),
});

const WeatherModel = ({
  open,
  setOpen,
  isEdit,
  setEdit,
}: {
  open: boolean;
  setOpen: any;
  isEdit: boolean;
  setEdit: any;
}) => {
  const defaultValues = {
    tag: "",
    latitude: 0,
    longitude: 0,
    dateRange: { from: undefined, to: undefined },
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const {
    addWeatherTag,
    weatherTags,
    changeActiveTag,
    activeTag,
    editWeatherTag,
  } = weatherStore();

  async function openMetroWeatherAPIcall(data: z.infer<typeof FormSchema>) {
    try {
      const params = {
        latitude: data.latitude,
        longitude: data.longitude,
        start_date: moment(data.dateRange.from).format("YYYY-MM-DD"),
        end_date: moment(data.dateRange.to).format("YYYY-MM-DD"),
        daily: [
          "temperature_2m_max",
          "temperature_2m_min",
          "temperature_2m_mean",
          "apparent_temperature_max",
          "apparent_temperature_min",
          "apparent_temperature_mean",
        ],
      };
      const url = "https://archive-api.open-meteo.com/v1/archive";
      const responses = await fetchWeatherApi(url, params);
      // Helper function to form time ranges
      const range = (start: number, stop: number, step: number) =>
        Array.from(
          { length: (stop - start) / step },
          (_, i) => start + i * step
        );

      // Process first location. Add a for-loop for multiple locations or weather models
      const response = responses[0];

      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const timezone = response.timezone();
      const timezoneAbbreviation = response.timezoneAbbreviation();
      const latitude = response.latitude();
      const longitude = response.longitude();

      const hourly = response.hourly()!;
      const daily = response.daily()!;

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        daily: {
          time: range(
            Number(daily.time()),
            Number(daily.timeEnd()),
            daily.interval()
          ).map((t) =>
            moment((t + utcOffsetSeconds) * 1000)
              .format("YYYY-MM-DD")
              .toString()
          ),
          temperature2mMax: daily.variables(0)!.valuesArray()!,
          temperature2mMin: daily.variables(1)!.valuesArray()!,
          temperature2mMean: daily.variables(2)!.valuesArray()!,
          apparentTemperatureMax: daily.variables(3)!.valuesArray()!,
          apparentTemperatureMin: daily.variables(4)!.valuesArray()!,
          apparentTemperatureMean: daily.variables(5)!.valuesArray()!,
        },
      };

      return weatherData.daily;
    } catch (error) {
      toast.error("OpenMetro Weather API broke");
      return null;
    }
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    if (!isEdit) {
      const weatherData = await openMetroWeatherAPIcall(data);
      console.log(weatherData);
      if (weatherData != null) {
        const finalVersion = weatherData.time.map((date, index) => ({
          date,
          temperature_2m_max: weatherData.temperature2mMax[index] || null,
          apparent_temperature_max:
            weatherData.apparentTemperatureMax[index] || null,
          temperature_2m_mean: weatherData.temperature2mMean[index] || null,
          apparent_temperature_mean:
            weatherData.apparentTemperatureMean[index] || null,
          temperature_2m_min: weatherData.temperature2mMin[index] || null,
          apparent_temperature_min:
            weatherData.apparentTemperatureMin[index] || null,
        }));

        console.log("finalVersion", finalVersion);
        addWeatherTag({
          latitude: data.latitude,
          longitude: data.longitude,
          title: data.tag,
          startDate: moment(data.dateRange.from).format("YYYY-MM-DD"),
          endDate: moment(data.dateRange.to).format("YYYY-MM-DD"),
          weatherData: finalVersion,
        });
        changeActiveTag(weatherTags.length);
      } else {
        toast.error("Try sometime after. APIBroke Error");
      }
    } else {
      if (
        weatherTags[activeTag].latitude != data.latitude ||
        weatherTags[activeTag].longitude != data.longitude ||
        weatherTags[activeTag].startDate !=
          moment(data.dateRange.from).format("YYYY-MM-DD") ||
        weatherTags[activeTag].endDate !=
          moment(data.dateRange.to).format("YYYY-MM-DD")
      ) {
        const weatherData = await openMetroWeatherAPIcall(data);
        if (weatherData != null) {
          const finalVersion = weatherData.time.map((date, index) => ({
            date,
            temperature_2m_max: weatherData.temperature2mMax[index] || null,
            apparent_temperature_max:
              weatherData.apparentTemperatureMax[index] || null,
            temperature_2m_mean: weatherData.temperature2mMean[index] || null,
            apparent_temperature_mean:
              weatherData.apparentTemperatureMean[index] || null,
            temperature_2m_min: weatherData.temperature2mMin[index] || null,
            apparent_temperature_min:
              weatherData.apparentTemperatureMin[index] || null,
          }));

          editWeatherTag(activeTag, {
            latitude: data.latitude,
            longitude: data.longitude,
            title: data.tag,
            startDate: moment(data.dateRange.from).format("YYYY-MM-DD"),
            endDate: moment(data.dateRange.to).format("YYYY-MM-DD"),
            weatherData: finalVersion,
          });
        } else {
          toast.error("Try sometime after. APIBroke Error");
        }
      } else if (weatherTags[activeTag].title != data.tag) {
        editWeatherTag(activeTag, {
          latitude: weatherTags[activeTag].latitude,
          longitude: weatherTags[activeTag].longitude,
          title: data.tag,
          startDate: weatherTags[activeTag].startDate,
          endDate: weatherTags[activeTag].endDate,
          weatherData: weatherTags[activeTag].weatherData,
        });
      }
    }
    form.reset(defaultValues);
    setEdit(false);
    setOpen(false);
  }

  function handleReset() {
    form.reset(defaultValues);
  }

  useEffect(() => {
    if (isEdit === true) {
      form.setValue("tag", weatherTags[activeTag].title);
      form.setValue("latitude", weatherTags[activeTag].latitude);
      form.setValue("longitude", weatherTags[activeTag].longitude);
      form.setValue(
        "dateRange.from",
        new Date(weatherTags[activeTag].startDate)
      );
      form.setValue("dateRange.to", new Date(weatherTags[activeTag].endDate));
    }
  }, [isEdit]);

  return (
    <>
      <AlertDialog
        open={open}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setEdit(false);
            form.reset(defaultValues);
          }
          setOpen(open);
        }}
      >
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isEdit ? "Edit" : "Add"} weather details
            </AlertDialogTitle>
            <AlertDialogDescription>
              Make changes to your profile here. Click save when you're done.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 pb-4"
            >
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter tag" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter latitude"
                        step="0.000001"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter longitude"
                        step="0.000001"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date range</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, y")} -{" "}
                                  {format(field.value.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date range</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={field.value}
                          onSelect={(value) => field.onChange(value)}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <AlertDialogFooter>
            {/* {weatherTags.length > 0 && (
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            )} */}
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {!isEdit && (
              <Button variant={"secondary"} onClick={handleReset}>
                Reset
              </Button>
            )}
            <Button onClick={form.handleSubmit(onSubmit)}>
              {isEdit ? "Save chnages" : "Add"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default WeatherModel;
