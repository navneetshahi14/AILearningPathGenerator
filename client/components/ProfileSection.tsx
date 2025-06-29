'use client'

import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
// import { Link } from "lucide-react";

export default function ProfileSection() {
  const { user } = useUser();
  const {getToken} = useAuth()
  const [data,setData] = useState([])
  const [data1,setData1] = useState([])
  useEffect(()=>{

    const fetchProgress = async() =>{
        const token = await getToken();
        const res = await fetch('http://localhost:6969/progress',{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        const resData = await res.json()
        console.log(resData)
        setData(resData);

    }
    const allData = async () => {
        const token = await getToken();

        const res = await fetch(`http://localhost:6969/learning`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        const resData = await res.json();
        console.log(resData[0])
        setData1(resData);
    }
    allData();

    

    fetchProgress()
  },[])

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
                    <h3>
                        {
                            data.map((dat:any,i:number)=>{
                                let xp = 0
                                data.forEach((data:any) => {
                                    xp = xp+data?.xp
                                });
                                return(
                                    <h1>{xp}</h1>
                                )
                            })
                        }
                    </h3>
                </div>
                <div>
                    <h1 className="text-lg font-semibold">Badge</h1>
                    <h3>5</h3>
                </div>
            </div>
            <div className="h-[0.1vh] w-[80%] bg-black"></div>
            <div className="flex flex-col w-[80%] gap-2  ">
                <h1 className=" text-lg font-semibold">Learning Streak</h1>
                {
                    data.map((dat:any,i:number)=>(
                        <h1 className="">{dat.longestStreak}</h1>
                    ))
                }
            </div>
        </div>
        <div className="w-[60%] h-[50%] bg-white/30 rounded-xl shadow-xl flex flex-col p-2 gap-5">
            <h1 className="text-2xl font-bold">Active Learning Path</h1>
                {
                    data1.length > 0 ?(

                        data1.slice(0,1).map((dat:any,i:number)=>{
                            let count = 0;
                            for(let i =0;i<dat.steps.length;i++){
                                if(dat.steps[i].status === 'done'){
                                    count++;
                                }
                            }
                            return(
                                <div className="w-[80%] h-[80%] border-[1px] border-black p-2 rounded-xl mx-auto flex flex-col justify-between  ">
                                    <div className="flex flex-col gap-4">
                                        <h1 className="text-2xl font-bold">{dat?.title}</h1>
                                        <h3 className="text-lg font-semibold text-gray-700">{count}/{dat.steps.length} Steps</h3>
                                    </div>
                                    <Button>
                                        <Link href="/Learnings">
                                            <h1>Go To Learning Page</h1>
                                        </Link>
                                    </Button>
                                </div>
                            )
                        })
                    ):(
                        <Button>
                            <Link href="/generatePage">
                                Start Learning
                            </Link>
                        </Button>
                    )
                }
        </div>
    </div>
  );
}
