"use client";
import { getDoctorsList } from "@/data/doctor";
import { Doctor } from "@/interfaces";
import React, { useEffect, useState } from "react";
import Doctors from "./Doctors";

const DoctorList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [doctorList, setDoctorList] = useState<Doctor[] | []>([]);

  useEffect(() => {
    setIsLoading(true);
    getDoctorsList().then((data) => {
      setDoctorList(data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="mb-10 px-8">
      <h2 className="font-bold text-xl">Popular Doctors</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4">
        {isLoading &&
          [1, 2, 3, 4, 5, 5, 7, 8].map((Item, index) => (
            <div
              key={index}
              className="h-[220px] bg-slate-100 w-full rounded-lg animate-pulse"
            ></div>
          ))}
        {!isLoading && <Doctors doctors={doctorList} />}
      </div>
    </div>
  );
};

export default DoctorList;
