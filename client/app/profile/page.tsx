'use client'
import Navbar from "@/components/Navbar";
import ProfileSection from "@/components/ProfileSection";
import { useEffect, useState } from "react";

export default function Page() {

    return (
        <>
            <div className="min-h-screen h-auto lg:h-screen w-full bg-amber-200 ">
                <Navbar />
                <div className="lg:h-[16vh] h-[10vh] w-full px-20 flex items-end">
                    <ul className=" flex gap-10 uppercase">
                        <li className={`cursor-pointer font-semibold underline underline-offset-1`}>Profile</li>
                        {/* <li onClick={() => setActive('setting')} className={`cursor-pointer font-semibold ${active === 'setting' ? "underline underline-offset-2" : ""}`}>Setting</li> */}
                    </ul>
                </div>
                <div className="h-auto min-h-[50vh] lg:h-[84vh] w-full p-2 py-1 ">
                    <ProfileSection />
                </div>
            </div>
        </>
    )
}