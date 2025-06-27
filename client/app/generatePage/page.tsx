'use client'
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";

export default function Page(){

    const [goal,setGoal] = useState('');
    const [isloading,setIsLoading] = useState(false)
    const {getToken } = useAuth()
    const [data,setdata] = useState([]);

    const handleClick = async() =>{
        setIsLoading(true)
        const token = await getToken()
        console.log(goal)

        // console.log(token)

        const res = await fetch('http://localhost:6969/learning',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({goal:goal})
        })

        const resData = await res.json()
        console.log(resData)
        setdata(resData);
        setIsLoading(false)
    }


    return (
        <>
            <div className="min-h-screen w-full bg-amber-200 flex justify-center">
                <Navbar />
                <div className="min-h-[100vh] w-full flex justify-center items-center flex-col  gap-10">
                    <div className="h-[50vh] w-full flex flex-col justify-center items-center">
                        <div className="text-center flex flex-col gap-4">
                            <h1 className="text-6xl font-extrabold">Generate Your Custom Skill Route</h1>
                            <h4 className="text-xl">What Do You Want to Learn?</h4>
                        </div>
                        <div className="w-[80%] flex justify-center items-center gap-5 ">
                            <Input onChange={(e)=>setGoal(e.target.value)} placeholder="Enter what you want to learn" className="w-[60%] border-black" />
                            <Button onClick={handleClick} className="w-[30%] cursor-pointer text-amber-200 uppercase" variant={'default'}>
                                {
                                    isloading?"Loading.....":"Generating"
                                }
                            </Button>
                        </div>
                    </div>
                    <div className="min-h-[50vh] w-[80vw] bg-amber-500/40 rounded-3xl shadow-2xl border-black border-[.5px] overflow-hidden p-2 px-5">
                        <p className="font-bold">Example</p>
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    Step1: Learn HTML & CSS
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        🕒 Duration: 1 Week
                                        🔗 Resources: [freeCodeCamp](#), [MDN Docs](#)
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    Step 2: Learn JavaScript Fundamentals
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        🕒 Duration: 1 Week
                                        🔗 Resources: [freeCodeCamp](#), [MDN Docs](#)
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    Step 3: Learn React.js
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        🕒 Duration: 1 Week
                                        🔗 Resources: [freeCodeCamp](#), [MDN Docs](#)
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    Step 4: Backend (Node.js + Express)
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        🕒 Duration: 1 Week
                                        🔗 Resources: [freeCodeCamp](#), [MDN Docs](#)
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>
                                    Step 5: Database (MongoDB)
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        🕒 Duration: 1 Week
                                        🔗 Resources: [freeCodeCamp](#), [MDN Docs](#)
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-6">
                                <AccordionTrigger>
                                    Step 6: Projects + GitHub Deployment
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-4 text-balance">
                                    <p>
                                        🕒 Duration: 1 Week
                                        🔗 Resources: [freeCodeCamp](#), [MDN Docs](#)
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className=" p-2 flex gap-10 ">
                        <Button className="w-[30vw] cursor-pointer text-xl" variant={'default'}>
                            Start
                        </Button>
                        <Button className="w-[30vw] cursor-pointer text-xl" variant={'outline'}>
                            Export as PDF
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}