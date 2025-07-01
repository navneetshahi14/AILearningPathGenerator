'use client'
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
// import { Link } from "lucide-react";
import { BarChart, Bar } from "recharts";

export default function ProfileSection() {
    const { user } = useUser();
    const { getToken } = useAuth()
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    useEffect(() => {

        const fetchProgress = async () => {
            const token = await getToken();
            const res = await fetch('http://localhost:6969/progress', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
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
    }, [])

    const completedPaths = data1.filter((dat: any) => {
        dat.steps.every((step: any) => step.status === 'done')
    })

    return (
        <div className="h-full w-full bg-amber-300/40 rounded-lg shadow p-2 overflow-hidden gap-2 flex justify-center lg:flex-wrap lg:flex-row flex-col ">
            <div className="w-full lg:w-[20%] lg:h-[50%] py-2 lg:p-0 bg-white/30 rounded-xl shadow-xl flex flex-col justify-center items-center gap-5">
                <Image
                    alt="User Profile"
                    src={user?.imageUrl || '/user.jpg'}
                    height={120}
                    width={120}
                    className="rounded-full 2xl:h-[20vh] 2xl:w-[10vw] object-cover shadow-2xl"
                />
                <div className="text-center">
                    <h1 className="text-2xl font-semibold 2xl:text-4xl">{user?.fullName}</h1>
                    <h1 className="text-sm 2xl:text-2xl font-semibold text-gray-800 ">{user?.emailAddresses[0].emailAddress}</h1>
                </div>
            </div>
            <div className="w-full lg:w-[60%] lg:h-[50%] py-2 bg-white/30 rounded-xl shadow-xl flex flex-col p-2 gap-5 overflow-hidden">
                <h1 className="text-2xl 2xl:text-4xl font-bold">Active Learning Path</h1>
                <div className="overflow-auto h-[90%] w-full flex flex-col gap-2">

                    {
                        data1.length > 0 ? (

                            data1.map((dat: any, i: number) => {
                                let count = 0;
                                for (let i = 0; i < dat.steps.length; i++) {
                                    if (dat.steps[i].status === 'done') {
                                        count++;
                                    }
                                }
                                return (
                                    <div key={i} className="w-[80%] h-[80%] border-[1px] border-black p-2 rounded-xl mx-auto flex flex-col justify-between  ">
                                        <div className="flex flex-col gap-4">
                                            <h1 className="text-2xl font-bold">{dat?.title}</h1>
                                            <h3 className="text-lg font-semibold text-gray-700">{count}/{dat.steps.length} Steps</h3>
                                        </div>
                                        <Button className="2xl:text-3xl p-2 h-auto">
                                            <Link href="/Learnings">
                                                <h1>Go To Learning Page</h1>
                                            </Link>
                                        </Button>
                                    </div>
                                )
                            })
                        ) : (
                            <Button>
                                <Link href="/generatePage">
                                    Start Learning
                                </Link>
                            </Button>
                        )
                    }
                </div>
            </div>
            <div className="w-full lg:w-[20%] lg:h-[50%] p-2 lg:p-2 bg-white/30 rounded-xl shadow-xl flex flex-col justify-center items-center gap-5">
                <div className="flex w-[80%] gap-20 ">
                    <div>
                        <h1 className="text-lg 2xl:text-4xl font-semibold">XP</h1>
                        <h3>
                            {
                                data.length > 0 ?(
                                    data.map((dat: any, i: number) => {
                                        let xp = 0
                                        data.forEach((data: any) => {
                                            xp = xp + data?.xp
                                        });
                                        return (
                                            <p className="2xl:text-3xl" key={i}>{xp}</p>
                                        )
                                    })

                                ):(
                                    <p className="2xl:text-3xl">{0}</p>
                                )
                            }
                        </h3>
                    </div>
                    <div>
                        <h1 className="text-lg 2xl:text-4xl font-semibold">Level</h1>
                        {
                            data.length> 0 ?(
                                data.slice(0, 1).map((dat: any, i: number) => (
                                    <h1 key={i} className="2xl:text-3xl">{dat.level}</h1>
                                ))
                            ):(
                                <h1 className="2xl:text-3xl">{0}</h1>
                            )
                        }
                    </div>
                </div>
                <div className="h-[0.1vh] w-[80%] bg-black"></div>
                <div className="flex flex-col w-[80%] gap-2  ">
                    <h1 className=" text-lg 2xl:text-4xl font-semibold">Learning Streak</h1>
                    {
                        data.length > 0?(
                            data.slice(0, 1).map((dat: any, i: number) => (
                                <h1 key={i} className="2xl:text-3xl">{dat.currentStreak} days</h1>
                            ))
                        ):(
                            <h1 className="2xl:text-3xl">{0} days</h1>
                        )
                    }
                </div>
            </div>
            <div className="w-full lg:w-[60%] lg:h-[50%] bg-white/30 rounded-xl shadow-xl flex flex-col p-2 gap-5 overflow-hidden">
                <h1 className="text-2xl font-bold 2xl:text-4xl">Completed Learning Path</h1>
                <div className={`overflow-auto h-auto w-full flex flex-col gap-2 `}>

                    {completedPaths.length > 0 ? (
                        completedPaths.map((dat: any, i: number) => (
                            <div
                                key={i}
                                className="w-[80%] h-[80%] border-[1px] border-green-600 p-4 rounded-xl mx-auto flex flex-col justify-between"
                            >
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-2xl font-bold">{dat.title}</h1>
                                    <h3 className="text-lg font-semibold text-gray-700">
                                        {dat.steps.length}/{dat.steps.length} Steps
                                    </h3>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center 2xl:text-3xl text-gray-600 text-lg font-semibold">
                            🚧 No learning path completed yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
