import { getDoctorsByCategories } from "@/data/doctor";
import { Category, Doctor } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DoctorSuggestionList = ({
  category,
}: {
  category: Category[] | undefined;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [doctorList, setDoctorList] = useState<Doctor[] | []>([]);
  const categories = category?.map((item) => item.name);

  useEffect(() => {
    setIsLoading(true);
    getDoctorsByCategories(categories).then((data) => {
      setDoctorList(data);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) return null;
  return (
    <div className="flex flex-col border-[1px] p-2">
      <h2 className="font-bold text-[22px] my-3">Suggestions</h2>
      <div className="flex flex-col space-y-3">
        {doctorList.map((doctor, index) => (
          <Link href={"/details/" + doctor.id} key={index}>
            <div className="flex  items-center gap-x-2 p-1 hover:bg-gray-100 rounded-lg">
              <div className="">
                <Image
                  src={doctor.image}
                  alt=""
                  width={50}
                  height={50}
                  priority
                  className="h-[50px] w-[50px] object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col space-y-3">
                <div className="mt-3 items-baseline flex flex-col gap-1">
                  <h2 className="text-[10px] bg-blue-100 p-1 rounded-xl text-primary">
                    {doctor.category[0].name}
                  </h2>
                  <h2 className="font-bold">{`Dr. ${doctor.first_name} ${doctor.last_name} `}</h2>
                  <h2 className="text-primary text-sm">
                    {`${doctor.years_of_experience} Years`}
                  </h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DoctorSuggestionList;
