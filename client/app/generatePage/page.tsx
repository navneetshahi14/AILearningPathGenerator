'use client'
import Navbar from "@/components/Navbar";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadPDF } from "@/utils/downLoadpdf";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface datastepsinterface {
    title: string;
    status: string;
    completedAt: Date | null;
}

export default function Page() {

    const [goal, setGoal] = useState('');
    const [isloading, setIsLoading] = useState(false)
    const { getToken } = useAuth()
    const [datastep, setDataSteps] = useState<datastepsinterface[]>([])
    const navigate = useRouter();

    const handleClick = async () => {
        setIsLoading(true)
        const token = await getToken()

        const res = await fetch('https://ailearningpathgenerator.onrender.com/learning', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ goal: goal })
        })

        const resData = await res.json()
        setDataSteps(resData);
        setIsLoading(false)
    }

    const startClick = async () => {

        const token = await getToken();
        const res = await fetch('https://ailearningpathgenerator.onrender.com/learning/start', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: goal,
                steps: datastep
            })
        })
        const resdata = await res.json();
        if (resdata) {
            navigate.push('/Learnings')
        }
    }

    const handleDownload = () => {
        if (datastep.length > 0) {
            downloadPDF(datastep, goal);
        }else{
            alert("First Generate the Learning Path");
        }
    }

    return (
        <>
            <div className="min-h-screen w-full bg-amber-200 flex justify-center">
                <Navbar />
                <div className="min-h-[100vh] h-auto overflow-auto w-full flex justify-center items-center flex-col  gap-10">
                    <div className="h-[30vh] mt-12 w-full flex flex-col justify-center items-center">
                        <div className="text-center flex flex-col gap-4 xl:gap-5">
                            <h1 className="text-6xl 2xl:text-5xl font-extrabold">Generate Your Custom Skill Route</h1>
                            <h4 className="text-xl 2xl:text-2xl">What Do You Want to Learn?</h4>
                        </div>
                        <div className="w-[80%] flex justify-center items-center gap-5 mt-1 ">
                            <Input onChange={(e) => setGoal(e.target.value)} placeholder="Enter what you want to learn" className="w-[60%] border-black 2xl:text-xl 2xl:h-auto 2xl:p-1" />
                            <Button onClick={handleClick} className="w-[30%] 2xl:text-lg 2xl:h-auto cursor-pointer text-amber-200 uppercase" variant={'default'}>
                                {
                                    isloading ? "Loading....." : "Generate"
                                }
                            </Button>
                        </div>
                    </div>
                    <div className="min-h-[30vh] w-[80vw] bg-amber-500/40 rounded-3xl shadow-2xl border-black border-[.5px] overflow-hidden p-2 px-5">
                        <p className="font-bold 2xl:text-[0.95rem]">
                            {
                                datastep.length > 0 ? goal : "Example"
                            }
                        </p>
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full "
                        >
                            {
                                datastep.length > 0 ? (
                                    datastep.map((dat: datastepsinterface, i: number) => (
                                        <>
                                            <AccordionItem value={`item-${i + 1}`}>
                                                <AccordionTrigger>
                                                    <p className="2xl:text-xl">
                                                        {dat?.title}
                                                    </p>
                                                </AccordionTrigger>
                                            </AccordionItem>
                                        </>
                                    ))
                                ) : (
                                    <>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                <p className="2xl:text-xl">
                                                    Step1: Learn HTML & CSS
                                                </p>
                                            </AccordionTrigger>
                                        </AccordionItem>
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>
                                                <p className="2xl:text-xl">
                                                    Step 2: Learn JavaScript Fundamentals
                                                </p>
                                            </AccordionTrigger>
                                        </AccordionItem>
                                        <AccordionItem value="item-3">
                                            <AccordionTrigger>
                                                <p className="2xl:text-xl">
                                                    Step 3: Learn React.js
                                                </p>
                                            </AccordionTrigger>
                                        </AccordionItem>
                                        <AccordionItem value="item-4">
                                            <AccordionTrigger>
                                                <p className="2xl:text-xl">
                                                    Step 4: Backend (Node.js + Express)
                                                </p>
                                            </AccordionTrigger>
                                        </AccordionItem>
                                    </>
                                )
                            }
                        </Accordion>
                    </div>
                    <div className=" p-2 flex gap-10 ">
                        <Button onClick={() => startClick()} disabled={!(datastep.length > 0)} className="w-[30vw] 2xl:w-[20vw] h-auto cursor-pointer text-xl 2xl:text-2xl 2xl:p-2" variant={'default'}>
                            Start
                        </Button>
                        <Button onClick={handleDownload} disabled={!(datastep.length > 0)} className="w-[30vw] 2xl:w-[20vw] h-auto cursor-pointer text-xl 2xl:text-2xl 2xl:p-2" variant={'outline'}>
                            Export as PDF
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
