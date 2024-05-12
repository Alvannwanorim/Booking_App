"use server";

import { db } from "@/lib/db";

export const getDoctorsList = async () => {
  try {
    const doctors = await db.doctor.findMany({
      include: {
        category: true,
      },
    });
    return doctors;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getDoctorsByCategory = async (category: string) => {
  try {
    const doctors = await db.doctor.findMany({
      where: {
        category: {
          some: {
            name: category,
          },
        },
      },
      include: {
        category: true,
      },
    });
    return doctors;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getDoctorsByCategories = async (
  categories: string[] | undefined
) => {
  try {
    if (!categories) return [];
    const doctors = await db.doctor.findMany({
      where: {
        category: {
          some: {
            name: {
              in: categories,
            },
          },
        },
      },
      include: {
        category: true,
      },
      take: 10,
    });
    return doctors;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getDoctorsById = async (id: string) => {
  try {
    const doctors = await db.doctor.findFirst({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    return doctors;
  } catch (err) {
    console.log(err);
    return null;
  }
};
