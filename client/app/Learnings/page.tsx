'use client'
import Navbar from "@/components/Navbar";
import { ReminderModal } from "@/components/ReminderModal";
import { Button } from "@/components/ui/button";
import { downloadPDF } from "@/utils/downLoadpdf";
import { useAuth } from "@clerk/nextjs";
import { Download, Trash, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface datastepsinterface {
    _id?: string;
    title: string;
    status: string;
    completedAt: Date | null;
}

interface datainterface {
    title: string;
    steps: datastepsinterface[];
    status: string;
    createdBy: string;
    _id: string;
}


export default function Page() {
    const [showModal, setShowModal] = useState(false);
    const [close, setClose] = useState(false);
    const { getToken } = useAuth();
    const [isloading, setIsLoading] = useState(false);
    const [data, setData] = useState<datainterface[]>([]);
    const [datastep, setDatastep] = useState<datastepsinterface[]>([]);
    const [dataId, setDataId] = useState('')
    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
    const [resd, setResd] = useState()
    const [deleted,setDeleted] = useState<boolean>(false)

    useEffect(() => {
        const allData = async () => {
            setIsLoading(true)
            const token = await getToken();

            const res = await fetch(`https://ailearningpathgenerator.onrender.com/learning`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })

            const resData = await res.json();
            setData(resData);
            setIsLoading(false);
        }
        allData();
    }, [resd,getToken,deleted])

    const handleClick = async (i: number) => {
        setClose(true);
        setDataId(data[i]?._id);
        setDatastep(data[i].steps);
    }

    const MarkDone = async (learningPathId: string, stepIndex: number, status: string) => {
        const token = await getToken();
        const data = await fetch('https://ailearningpathgenerator.onrender.com/learning/mark-done', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                learningPathId,
                stepIndex,
                status
            })
        })

        const res = await data.json();
        console.log(res);
        setResd(res)
        setClose(false);
    }

    const clickDelete = async (id: string) => {
        const token = await getToken();
        await fetch(`https://ailearningpathgenerator.onrender.com/learning/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setDeleted(!deleted)
    }

    const clickDownload = async (i: number) => {
        if (!data || !data[i]) return;

        const filteredSteps = data[i].steps;
        downloadPDF(filteredSteps, data[i].title);
    }

    return (
        <>
            <div className="min-h-screen w-full bg-amber-200">
                <Navbar />
                <div className="flex h-screen justify-center items-center flex-col relative overflow-auto">
                    <div className="h-[10vh] lg:h-[20vh] w-full flex items-end">
                        <h1 className="lg:text-6xl text-3xl uppercase pt-20 pl-10 font-semibold">Learnings</h1>
                    </div>
                    <div className="min-h-[75vh] overflow-hidden gap-10 flex flex-col w-[90vw] lg:w-[80vw] bg-amber-100 rounded-xl shadow-2xl my-5 items-center ">
                        {/* <h1 className="text-xl">No Learnings Started Yet</h1> */}
                        <div className="h-[100%] w-full p-2 flex flex-wrap gap-5 items-center px-[8vw] py-10">
                            {
                                isloading === true ? (
                                    <div className="text-xl 2xl:text-2xl">Loading</div>
                                ) : (
                                    data.length > 0 ? (
                                        data.map((data: datainterface, i: number) => {
                                            let count = 0;
                                            for (let j = 0; j < data.steps.length; j++) {
                                                if (data?.steps[j]?.status === 'done') {
                                                    count++;
                                                }
                                            }
                                            return (
                                                <div key={i} className="lg:h-[30vh] lg:w-[20vw] w-[35vw] h-[30vh] overflow-hidden bg-white/50 shadow-xl rounded-xl p-2 2xl:p-5 flex flex-col justify-between cursor-pointer" >
                                                    <div onClick={() => handleClick(i)} className="">
                                                        <h1 className="text-2xl 2xl:text-xl font-bold">{data?.title}</h1>
                                                        <h2 className="2xl:text-lg" >Total Steps : {data?.steps?.length}</h2>
                                                        <h2 className="2xl:text-lg" >Completed Steps: {count}</h2>
                                                    </div>
                                                    <div className=" flex gap-5 mx-auto 2xl:gap-20 2xl:py-8">
                                                        <Button onClick={() => clickDelete(data?._id)} variant={'secondary'} className="shadow-lg cursor-pointer mb-5 h-auto w-auto 2xl:scale-[1.03]"><Trash /></Button>
                                                        <Button onClick={() => clickDownload(i)} variant={'secondary'} className="shadow-lg cursor-pointer mb-5 h-auto w-auto 2xl:scale-[1.03]"><Download /></Button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div className="h-full w-full flex flex-col gap-10 ">
                                            <h1 className="text-center text-2xl font-bold">Not Created any Path</h1>
                                            <Button>
                                                <Link href={'/generatePage'}>
                                                    Create a Path
                                                </Link>
                                            </Button>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>

                    <div className={`${close ? '' : 'hidden'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/50 min-h-screen w-full ${showModal ? "" : "z-[9999]"} flex flex-col lg:justify-center items-center overflow-hidden p-2`}>
                        <div className="absolute right-10 top-5">
                            <X onClick={() => setClose(false)} className="text-2xl font-bold cursor-pointer" />
                        </div>
                        <div className="flex items-start justify-start w-[80%] px-5">
                            <Button onClick={() => setShowModal(true)}>Set Reminder</Button>
                        </div>
                        <ReminderModal
                            open={showModal}
                            onClose={() => setShowModal(false)}
                            learningPathId={dataId}
                        />
                        {/* <div className="flex flex-col items-center h-[90vh] w-full gap-5 p-2 overflow-auto inset-shadow-2xl inset-shadow-black ">
                            {
                                datastep.map((data: any, i) => (
                                    <div key={i} className="w-[80%] h-[50%] justify-between flex flex-col gap-5 bg-gray-200 p-2 shadow-lg rounded-xl">
                                        <h1 className="text-4xl font-semibold">{data.title}</h1>
                                        <h1 className="">Status: <span className="">{data?.status}</span></h1>
                                        {
                                            data?.status === 'done' ? (
                                                <div className="w-full h-auto p-2 bg-green-500 text-white border-green-700 border-2 rounded-2xl text-xl font-bold cursor-pointer">Completed</div>
                                            ) : (
                                                <Button onClick={() => MarkDone(dataId, i, "done")} className="cursor-pointer">Mark as Done</Button>
                                            )
                                        }

                                    </div>
                                ))
                            }
                        </div> */}
                        {/* <div className="space-y-6"> */}
                        <div className="flex flex-col h-[90vh] w-full items-center gap-5 p-2 overflow-auto inset-shadow-2xl inset-shadow-black ">
                            {datastep.map((step: datastepsinterface, idx: number) => (
                                <div
                                    key={idx}
                                    className="bg-white shadow-md rounded-xl p-4 border-l-4 
                 border-lime-600 flex flex-col gap-3 w-[80%]"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {step.title}
                                    </h2>

                                    <div className="text-sm text-gray-600">
                                        Status:{" "}
                                        <span className={step.status === 'done' ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"}>
                                            {step.status}
                                        </span>
                                    </div>

                                    {step.status === 'done' ? (
                                        <div className="bg-green-500 text-white px-4 py-2 rounded-lg w-max text-sm shadow-sm">
                                            ✅ Completed
                                        </div>
                                    ) : (
                                        <button
                                            className="bg-gray-900 hover:bg-gray-700 transition-all text-white px-4 py-2 rounded-lg text-sm w-max"
                                            onClick={() => {
                                                setLoadingIndex(idx);
                                                MarkDone(dataId, idx, "done").finally(() => setLoadingIndex(null));
                                              }}
                                        >
                                            {
                                                loadingIndex === idx  ? (
                                                    <p className="">Loading....</p>
                                                ) : (
                                                    <p className="">Mark as Done</p>
                                                )
                                            }

                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
