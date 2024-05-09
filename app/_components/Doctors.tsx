import { Doctor } from "@/interfaces";
import Image from "next/image";
import React from "react";

const Doctors = ({ doctors }: { doctors: Doctor[] }) => {
  return (
    <>
      {doctors.map((item: Doctor, index: React.Key | null | undefined) => (
        <div
          key={index}
          className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary"
        >
          <Image
            src={item.image}
            alt=""
            width={500}
            height={300}
            priority
            className="h-[300px] w-full object-cover rounded-lg"
          />
          <div className="mt-3 items-baseline flex flex-col gap-1">
            <h2 className="text-[10px] bg-blue-100 p-1 rounded-xl text-primary">
              {item.category[0].name}
            </h2>
            <h2 className="font-bold">{`Dr. ${item.first_name} ${item.last_name} `}</h2>
            <h2 className="text-primary text-sm">
              {`${item.years_of_experience} Years`}
            </h2>
            <h2 className="text-gray-500 text-sm">{item.address}</h2>
            <h2 className="p-2 px-3 border-[1px] border-primary text-primary rounded-full text-center w-full text-[11px] mt-2 cursor-pointer hover:bg-primary hover:text-white">
              Book Now
            </h2>
          </div>
        </div>
      ))}
    </>
  );
};

export default Doctors;
