"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarSearch, Clock } from "lucide-react";
import { Doctor, TimeSlot } from "@/interfaces";
import { Textarea } from "@/components/ui/textarea";
import { bookAppointment } from "@/actions/appointments";
import { getUser } from "@/actions/getsession";

export default function BookAppointment({ doctor }: { doctor: Doctor }) {
  // const session = await auth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [timeSlot, setTimeSlot] = useState<TimeSlot[] | []>([]);
  const [note, setNote] = useState("");
  const [user, SetUser] = useState<any>(null);

  const handleSubmit = () => {
    bookAppointment(selectedTimeSlot, doctor.id, user, note);
  };
  useEffect(() => {
    getUser().then((data) => SetUser(data));
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];

    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });

      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });

      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeSlot(timeList);
  };

  const isPastDay = (day: Date) => {
    return day <= new Date();
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-lg">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                {/* Calender */}
                <div className="flex flex-col gap-3 items-baseline">
                  <div className="flex gap-2 items-center">
                    <CalendarSearch className="text-primary h-5 w-5" />
                    Select Date
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="rounded-md border"
                  />
                </div>
                {/* time slot  */}
                <div className="mt-3 md:mt-0">
                  <h2 className="flex gap-3 items-center">
                    <Clock className="text-primary h-5 w-5" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 border rounded-lg p-3 mt-3">
                    {timeSlot.map((item, index) => (
                      <h2
                        onClick={() => setSelectedTimeSlot(item.time)}
                        className={`p-2 border rounded-full hover:bg-primary hover:text-white ${
                          item.time === selectedTimeSlot &&
                          "bg-primary text-white"
                        }`}
                        key={index}
                      >
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              <Textarea
                placeholder="Notes for the doctor"
                className="mt-2"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <>
              <Button
                type="button"
                variant="outline"
                className="text-red-500 border-red-500 "
              >
                Close
              </Button>
              <Button
                type="button"
                disabled={!(date && selectedTimeSlot)}
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
