"use client";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/data/category";
import Image from "next/image";
import Link from "next/link";
interface CategoryList {
  id: string;
  name: string;
  icon: string;
}
const Category = () => {
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {isLoading &&
        [1, 2, 3, 4, 5, 5, 6].map((Item, index) => (
          <div className="h-[130px] w-[130px] m-2 bg-slate-100 rounded-lg animate-pulse"></div>
        ))}
      {categoryList.map(
        (item, index) =>
          index < 6 && (
            <Link
              href={"/search/" + item.name}
              key={index}
              className="flex flex-col items-center space-y-2 text-center p-5 bg-blue-50 m-2 rounded-lg hover:scale-110 transition-all ease-in-out cursor-pointer"
            >
              <Image
                src={item.icon}
                alt={item.name}
                width={40}
                height={40}
                className=""
              />
              <label className="text-blue-500 text-sm">{item.name}</label>
            </Link>
          )
      )}
    </div>
  );
};

export default Category;
