'use client'

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ProfileSection() {
  const { user } = useUser();

  return (
    <div className="h-full w-full bg-amber-300/40 rounded-lg shadow p-2 overflow-hidden gap-2 flex justify-center flex-wrap ">
        <div className="w-[20%] h-[50%] bg-white/30 rounded-xl shadow-xl flex flex-col justify-center items-center gap-5">
            <Image
                alt="User Profile"
                src={user?.imageUrl || '/Ai.jpg'}
                height={120}
                width={120}
                className="rounded-full object-cover shadow-2xl"
            />
            <div className="text-center">
                <h1 className="text-2xl font-semibold ">{user?.fullName}</h1>
                <h1 className="text-sm font-semibold text-gray-800 ">{user?.emailAddresses[0].emailAddress}</h1>
            </div>
        </div>
        <div className="w-[60%] h-[50%] bg-white/30 rounded-xl shadow-xl flex flex-col gap-5 p-2">
            <h1 className="text-2xl font-bold">Learning Progress</h1>

        </div>
        <div className="w-[20%] h-[50%] bg-white/30 rounded-xl shadow-xl flex flex-col justify-center items-center gap-5">
            <div className="flex w-[80%] gap-20 ">
                <div>
                    <h1 className="text-lg font-semibold">XP</h1>
                    <h3>21</h3>
                </div>
                <div>
                    <h1 className="text-lg font-semibold">Badge</h1>
                    <h3>5</h3>
                </div>
            </div>
            <div className="h-[0.1vh] w-[80%] bg-black"></div>
            <div className="flex flex-col w-[80%] gap-2  ">
                <h1 className=" text-lg font-semibold">Learning Streak</h1>
                <h1 className="">82 days</h1>
            </div>
        </div>
        <div className="w-[60%] h-[50%] bg-white/30 rounded-xl shadow-xl flex flex-col p-2 gap-5">
            <h1 className="text-2xl font-bold">Active Learning Path</h1>
            <div className="w-[80%] h-[80%] border-[1px] border-black p-2 rounded-xl mx-auto flex flex-col justify-between  ">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Full Stack Development</h1>
                    <h3 className="text-lg font-semibold text-gray-700">3/12 Steps</h3>
                </div>
                <Button>
                    Go To Learning Page
                </Button>
            </div>
        </div>
    </div>
  );
}
