"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { WeatherForcastChart } from "./weatherForcastChart";
import ChangeButton from "./changeButton";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  CircleFadingPlus,
  CircleX,
  Minus,
  Pen,
  Plus,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { weatherStore } from "@/stores/weather-store";
import WeatherModel from "./weatherModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import WeatherForcastTable from "./weatherForcastTable";

const Dashboard = () => {
  const {
    weatherTags,
    addWeatherTag,
    removeWeatherTag,
    activeTag,
    changeActiveTag,
    offset,
    changeOffset,
  } = weatherStore();

  useEffect(() => {
    if (weatherTags.length <= 0) {
      setEditWeatherModel(false);
      setOpenWeatherModel(true);
    }
  }, [weatherTags]);

  useEffect(() => {
    if (activeTag === -1 && weatherTags.length > 0) {
      changeActiveTag(0);
    }
  }, [activeTag]);

  const [openWeatherModel, setOpenWeatherModel] = useState(false);
  const [editWeatherModel, setEditWeatherModel] = useState(false);
  const [deleteWeatherTag, setDeleteWeatherTag] = useState(false);

  const [loader, setLoader] = useState(false);

  return (
    <main className="px-4 pb-4 w-full">
      <Tabs
        orientation="vertical"
        defaultValue="overview"
        className="space-y-4"
      >
        <div className="w-full overflow-x-auto pb-2 flex max-md:flex-col gap-2 md:justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>
          {weatherTags.length > 0 && (
            <div className="flex gap-2 justify-center items-center">
              <Select
                value={activeTag.toString()}
                onValueChange={(value: string) =>
                  changeActiveTag(parseInt(value))
                }
              >
                <SelectTrigger className="w-auto space-x-2 md:max-w-[11vw]">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Weather Tags</SelectLabel>
                    {weatherTags.map((data, key) => (
                      <SelectItem value={key.toString()} key={key}>
                        {data.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                className="scale-95 rounded-full border-blue-300 hover:border-blue-500"
                onClick={() => {
                  setEditWeatherModel(true);
                  setOpenWeatherModel(true);
                }}
              >
                <Pen className="size-[1.2rem] scale-90 " />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="scale-95 rounded-full border-red-300 hover:border-red-500"
                onClick={() => setDeleteWeatherTag(true)}
              >
                <Trash2 className="size-[1.2rem] scale-90 " />
              </Button>

              <Separator orientation="vertical" className="max-md:h-[5vh]" />
              <Button
                variant="outline"
                size="icon"
                className="scale-95 rounded-full border-indigo-500 hover:border-indigo-600"
                onClick={() => {
                  if (weatherTags.length === 4) {
                    toast.warning("Weather Tags max limit of 4 reached");
                    return true;
                  }
                  setEditWeatherModel(false);
                  setOpenWeatherModel(true);
                }}
              >
                <Plus className="size-[1.2rem] scale-90 " />
              </Button>
            </div>
          )}
        </div>
        <TabsContent value="overview" className="space-y-4">
          {weatherTags[activeTag] &&
          weatherTags[activeTag].title != undefined ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Latitude
                    </CardTitle>
                    <CircleFadingPlus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {weatherTags[activeTag]?.latitude}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Longitude
                    </CardTitle>
                    <div className="relative">
                      <CircleFadingPlus className="h-4 w-4 text-muted-foreground" />
                      <div className="absolute size-2 top-1 left-1 rounded-full bg-card">
                        <Minus className="h-2 w-2 text-muted-foreground" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {weatherTags[activeTag]?.longitude}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Start Date
                    </CardTitle>

                    <CalendarArrowUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {weatherTags[activeTag]?.startDate}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      End Date
                    </CardTitle>

                    <CalendarArrowDown className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {weatherTags[activeTag]?.endDate}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <WeatherForcastChart
                  data={weatherTags[activeTag].weatherData}
                />
                {loader ? (
                  <span className="flex justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <p>Loading Temperature Insights .... </p>
                  </span>
                ) : (
                  <WeatherForcastTable
                    data={weatherTags[activeTag].weatherData}
                    pageSize={offset}
                    setPageSize={changeOffset}
                    setLoader={setLoader}
                    loader={loader}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div className="h-[78dvh] flex justify-center items-center border-2 border-red-500">
                <h4 className="text-xl relative z-20 md:text-4xl lg:text-4xl font-bold text-center text-black dark:text-white font-sans tracking-tight max-w-[40vw] border-2 border-blue-500">
                  What&apos;s cooler than Clouds?{" "}
                  <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                    <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                      <span className="">Forecasts. Let&apos;s add yours!</span>
                    </div>
                    <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                      <span className="">Forecasts. Let&apos;s add yours!</span>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                    onClick={() => {
                      setEditWeatherModel(false);
                      setOpenWeatherModel(true);
                    }}
                  >
                    Click Here
                  </button>
                </h4>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
      <WeatherModel
        open={openWeatherModel}
        setOpen={setOpenWeatherModel}
        isEdit={editWeatherModel}
        setEdit={setEditWeatherModel}
      />

      <AlertDialog open={deleteWeatherTag} onOpenChange={setDeleteWeatherTag}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={() => {
                console.log("activeTag", activeTag);
                console.log("weatherTags", weatherTags.length - 1);
                if (activeTag === 0 && weatherTags.length === 0) {
                  toast.success(1);
                  removeWeatherTag(activeTag);
                  changeActiveTag(-1);
                } else if (
                  activeTag === weatherTags.length - 1 &&
                  activeTag != 0
                ) {
                  toast.success(2);
                  removeWeatherTag(activeTag);
                  changeActiveTag(0);
                } else {
                  toast.success(3);
                  removeWeatherTag(activeTag);
                }
                setDeleteWeatherTag(false);
              }}
            >
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Dashboard;
