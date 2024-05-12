"use client";

import React, { useEffect, useState } from "react";
import { getDoctorsById } from "@/data/doctor";
import { Doctor, SearchParams } from "@/interfaces";
import { getSingleValue } from "@/lib/helpers";
import DoctorDetails from "./_components/DoctorDetails";
import DoctorSuggestionList from "./_components/DoctorSuggestionList";

interface DetailProps {
  params: SearchParams;
}

const Detail: React.FC<DetailProps> = ({ params }) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = getSingleValue(params.recordId);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getDoctorsById(id)
        .then((data) => {
          if (data) setDoctor(data);
          setError(null);
        })
        .catch((err) => {
          console.error("Failed to fetch doctor data:", err);
          setError("Failed to load doctor details.");
          setDoctor(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-5 md:px-20 ">
      <h2 className="font-bold text-[22px]">Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Doctor Details */}
        <div className="col-span-3">
          {doctor && <DoctorDetails doctor={doctor} />}
        </div>
        {/* Doctors suggestions */}
        <div className=" ml-3">
          <DoctorSuggestionList category={doctor?.category} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
