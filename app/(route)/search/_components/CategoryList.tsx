"use client";
import React, { useEffect, useState } from "react";

import { getAllCategories } from "@/data/category";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getSingleValue } from "@/lib/helpers";
interface CategoryList {
  id: string;
  name: string;
  icon: string;
}

const CategoryList = () => {
  const params = useParams();
  const cnameParam = getSingleValue(params.cname);
  const category = decodeURIComponent(cnameParam);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<CategoryList[] | []>([]);
  useEffect(() => {
    setIsLoading(true);
    getAllCategories().then((data) => {
      setCategoryList(data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="h-screen fixed mt-3 flex flex-col">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="suggestions">
            {categoryList &&
              categoryList.map((item, index) => (
                <CommandItem key={index}>
                  <Link
                    href={"/search/" + item.name}
                    className={`p-2 flex gap-2 text-[12px] text-blue-600 rounded-md cursor-pointer w-full
                    items-center 
                    ${category == item.name && "bg-blue-100"}
                    `}
                  >
                    <Image src={item.icon} alt="Icon" width={25} height={25} />
                    <label>{item.name}</label>
                  </Link>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;
