"use client";
import Doctors from "@/app/_components/Doctors";
import { getDoctorsByCategory, getDoctorsList } from "@/data/doctor";
import { Doctor } from "@/interfaces";
import { getSingleValue } from "@/lib/helpers";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SearchParams {
  query?: string;
  category?: string;
  cname?: string;
  [key: string]: any;
}
const Search: React.FC<SearchParams> = ({ params }) => {
  const cnameParam = getSingleValue(params.cname);
  const category = decodeURIComponent(cnameParam);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [doctorList, setDoctorList] = useState<Doctor[] | []>([]);

  useEffect(() => {
    setIsLoading(true);
    getDoctorsByCategory(category).then((data) => {
      setDoctorList(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="mb-10 px-8">
        <h2 className="font-bold text-xl">{category}</h2>
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
    </>
  );
};

export default Search;
