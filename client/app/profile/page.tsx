'use client'
import Navbar from "@/components/Navbar";
import ProfileSection from "@/components/ProfileSection";
import { useState } from "react";

export default function Page(){

    const [active,setActive] = useState('profile')

    return (
        <>
            <div className="h-screen w-full bg-amber-200 ">
                <Navbar />
                <div className="h-[16vh] w-full px-20 flex items-end">
                    <ul className=" flex gap-10 uppercase">
                        <li onClick={()=>setActive('profile')} className={`cursor-pointer font-semibold ${active === 'profile'? "underline underline-offset-2": ""}`}>Profile</li>
                        <li onClick={()=>setActive('setting')} className={`cursor-pointer font-semibold ${active === 'setting'? "underline underline-offset-2": ""}`}>Setting</li>
                    </ul>
                </div>
                {
                    (active === 'profile')?(
                        <div className="h-[84vh] w-full p-2 py-1 ">
                            <ProfileSection />
                        </div>
                    ):(
                        <div className="h-[84vh] w-full p-2 py-1 ">
                            
                        </div>
                    )
                }
            </div>
        </>
    )
}