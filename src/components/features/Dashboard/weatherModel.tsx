"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
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
  FormDescription,
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

// const FormSchema = z.object({
//   dateRange: z
//     .object({
//       from: z.date({
//         required_error: "Start date is required.",
//       }),
//       to: z.date({
//         required_error: "End date is required.",
//       }),
//     })
//     .refine((data) => data.from <= data.to, {
//       message: "The start date must be before the end date.",
//     }),
//   latitude: z
//     .number()
//     .min(-90, { message: "Latitude must be at least -90." })
//     .max(90, { message: "Latitude must be at most 90." })
//     .refine((val) => val !== undefined, { message: "Latitude is required." }),
//   longitude: z
//     .number()
//     .min(-180, { message: "Longitude must be at least -180." })
//     .max(180, { message: "Longitude must be at most 180." })
//     .refine((val) => val !== undefined, { message: "Longitude is required." }),
// });

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
}: {
  open: boolean;
  setOpen: any;
  isEdit: boolean;
}) => {
  const defaultValues = {
    latitude: undefined,
    longitude: undefined,
    dateRange: { from: undefined, to: undefined },
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  function handleReset() {
    form.reset(defaultValues);
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit weather details</AlertDialogTitle>
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant={"secondary"} onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)}>Save changes</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default WeatherModel;
