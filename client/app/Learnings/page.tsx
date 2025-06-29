'use client'
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { downloadPDF } from "@/utils/downLoadpdf";
import { useAuth } from "@clerk/nextjs";
import { Download, Trash, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Page() {

    const [close, setClose] = useState(false);
    const { getToken } = useAuth();
    const [isloading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const [datastep, setDatastep] = useState([]);
    const [dataId, setDataId] = useState('')
    const [isLoading,setIsloading] = useState<boolean>(false)
    const [resd,setResd] = useState()

    useEffect(() => {
        const allData = async () => {
            setIsLoading(true)
            const token = await getToken();

            const res = await fetch(`http://localhost:6969/learning`, {
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
    }, [resd])

    const handleClick = async (i: number) => {
        setClose(true);
        setDataId(data[i]._id);
        setDatastep(data[i].steps);
    }

    const MarkDone = async (learningPathId: string, stepIndex: number, status: string) => {
        setIsloading(true)
        const token = await getToken();
        const data = await fetch('http://localhost:6969/learning/mark-done', {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
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
        setIsloading(false);
    }

    const clickDelete = async(id:string) =>{
        let token = await getToken();
        await fetch(`http://localhost:6969/learning/delete/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    }

    const clickDownload = async(i:number) =>{
        const filteredSteps =await data[i].steps.map(({ title, status }:string) => ({
            title,
            status,
          }));
        downloadPDF(filteredSteps,data[i]?.title);
        // setDatastep([]);
    }

    return (
        <>
            <div className="min-h-screen w-full bg-amber-200">
                <Navbar />
                <div className="flex justify-center items-center flex-col relative overflow-auto">
                    <div className="h-[20vh] w-full flex items-end">
                        <h1 className="text-6xl uppercase pt-20 pl-10 font-semibold">Learnings</h1>
                    </div>
                    <div className="min-h-[75vh] overflow-hidden gap-10 flex flex-col w-[80vw] bg-amber-100 rounded-xl shadow-2xl my-5 items-center ">
                        {/* <h1 className="text-xl">No Learnings Started Yet</h1> */}
                        <div className="h-[100%] w-full p-2 flex flex-wrap gap-5 items-center px-[8vw] py-10">
                            {/* {
                                [0,1,2,3,4,5].map((i)=>(
                                    
                                ))
                            } */}
                            {
                                isloading === true ? (
                                    <div className="">Loading</div>
                                ) : (
                                    data.length > 0 ? (
                                        data.map((data: any, i: number) => {
                                            let count = 0;
                                            for (let j = 0; j < data.steps.length; j++) {
                                                if (data?.steps[j]?.status === 'done') {
                                                    count++;
                                                }
                                            }
                                            return (
                                                <div key={i} className="h-[30vh] w-[20vw] overflow-hidden bg-white/50 shadow-xl rounded-xl p-2 flex flex-col justify-between cursor-pointer" >
                                                    <div onClick={() => handleClick(i)}  className="">
                                                        <h1 className="text-2xl font-bold">{data?.title}</h1>
                                                        <h2>Total Steps : {data?.steps?.length}</h2>
                                                        <h2>Completed Steps: {count}</h2>
                                                    </div>
                                                    <div className=" flex gap-5 mx-auto">
                                                        <Button onClick={()=>clickDelete(data?._id)} variant={'secondary'} className="shadow-lg cursor-pointer mb-5"><Trash /></Button>
                                                        <Button onClick={()=>clickDownload(i)} variant={'secondary'} className="shadow-lg cursor-pointer mb-5"><Download /></Button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ):(
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

                    <div className={`${close ? '' : 'hidden'} absolute top-1/2 left-1/2 -translate-1/2 bg-white/50 h-screen w-full z-[9999] flex justify-center items-center overflow-hidden p-2`}>
                        <div className="absolute right-10 top-5">
                            <X onClick={() => setClose(false)} className="text-2xl font-bold cursor-pointer" />
                        </div>
                        <div className="flex flex-col items-center h-[90vh] w-full gap-5 p-2 overflow-auto inset-shadow-2xl inset-shadow-black ">
                            {
                                datastep.map((data: any, i) => (
                                    <div className="w-[80%] h-[50%] justify-between flex flex-col gap-5 bg-gray-200 p-2 shadow-lg rounded-xl">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}