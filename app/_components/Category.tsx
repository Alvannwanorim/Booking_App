"use client";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/data/category";
import Image from "next/image";
interface CategoryList {
  id: string;
  name: string;
  icon: string;
}
const Category = () => {
  const [categoryList, setCategoryList] = useState<CategoryList[] | []>([]);
  useEffect(() => {
    getAllCategories().then((data) => setCategoryList(data));
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {categoryList.map(
        (item, index) =>
          index < 6 && (
            <div
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
            </div>
          )
      )}
    </div>
  );
};

export default Category;
