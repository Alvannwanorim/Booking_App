import { Doctor } from "@/interfaces";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookAppointment from "./BookAppointment";
const socialIcons = [
  {
    id: 1,
    icon: "/youtube.svg",
  },

  {
    id: 2,
    icon: "/linkedin.svg",
  },
  {
    id: 3,
    icon: "/twitter.svg",
  },
  {
    id: 4,
    icon: "/facebook.svg",
  },
];
const DoctorDetails = ({ doctor }: { doctor: Doctor }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] rounded-lg mt-5 p-2">
        {/* Doctor Image */}
        <div>
          <Image
            src={doctor.image}
            width={200}
            height={200}
            alt="doctor-image"
            className=" rounded-lg h-[270px] w-full object-cover"
          />
        </div>
        {/* Doctor Info */}
        <div className="col-span-2 mt-5 flex flex-col gap-3 items-baseline md: px-10">
          <h2 className="font-bold text-2xl">{`Dr. ${doctor.first_name} ${doctor.last_name}`}</h2>
          <h2 className="flex gap-2 text-gray-500 font-medium">
            <GraduationCap />
            <span>{doctor.years_of_experience} Years of Experience</span>
          </h2>
          <h2 className="flex font-medium gap-2 text-gray-500 ">
            <MapPin />
            <span>{doctor.address}</span>
          </h2>
          <h2 className="text-[10px] bg-blue-100 p-1 rounded-xl text-primary">
            {doctor.category[0].name}
          </h2>
          <div className="flex gap-3">
            {socialIcons.map((item, index) => (
              <div className=" h-30 w-30">
                <Image
                  src={item.icon}
                  width={30}
                  height={30}
                  alt=""
                  className="text-gray-500"
                />
              </div>
            ))}
          </div>
          <BookAppointment doctor={doctor} />
        </div>
        {/* About Doctor */}
      </div>
      <div className="p-3 border-[1px] rounded-lg mt-5">
        <h2 className="font-bold text-[22px]">About Me</h2>
        <p className="text-gray-500 tracking-wider mt-2">{doctor.about}</p>
      </div>
    </>
  );
};

export default DoctorDetails;
