"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllCategories } from "@/data/category";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Category from "./Category";

const CategorySearch = () => {
  return (
    <div className="mb-10 flex flex-col items-center space-y-2 px-2">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-primary">Doctors </span>
      </h2>
      <h2 className="text-gray-500 text-xl">
        Search doctors and Book appointments
      </h2>

      <div className="flex mt-3 w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit">
          <Search className="w-4 h-4 mr-2" />
          Subscribe
        </Button>
      </div>

      {/* Display List of Category  */}
      <Category />
    </div>
  );
};

export default CategorySearch;
