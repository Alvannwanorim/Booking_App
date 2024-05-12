import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Header() {
  const session = await auth();
  const image = session?.user?.image ?? "/default.png";
  console.log(image);

  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/",
    },
  ];
  return (
    <div className="flex justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo image" width={180} height={80} />

        <ul className="md:flex items-center gap-8 hidden">
          {Menu.map((item, index) => (
            <Link href={item.path} key={index}>
              <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out font-medium">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {session?.user ? (
        <>
          <Popover>
            <PopoverTrigger>
              <Image
                src={`${image}`}
                alt="user img"
                height={30}
                width={30}
                className="rounded-full border-[1px] "
              />
            </PopoverTrigger>
            <PopoverContent>
              <ul className="flex flex-col gap-1 justify-center items-center">
                <li className="cursor-pointer hover:bg-slate-100 rounded-md w-full flex justify-center items-center p-1">
                  Profile
                </li>
                <li className="cursor-pointer hover:bg-slate-100 rounded-md w-full flex justify-center items-center p-1">
                  My Bookings
                </li>
                <li className="cursor-pointer hover:bg-slate-100 rounded-md w-full flex justify-center items-center p-1">
                  <form
                    action={async () => {
                      "use server";
                      await signOut({
                        redirectTo: "/",
                      });
                    }}
                  >
                    <Button variant="link" type="submit" className="w-full">
                      Logout
                    </Button>
                  </form>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <>
          <Button>Get Started </Button>
        </>
      )}
    </div>
  );
}
