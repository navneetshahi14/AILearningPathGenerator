'use client'
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Download, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {

    const [close, setClose] = useState(false);
    const { getToken } = useAuth();
    const [isloading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [datastep,setDatastep] = useState([]);

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
            console.log(resData);
            setData(resData);
            setIsLoading(false);
        }
        allData();
    }, [])

    const handleClick = async(i:number) =>{
        setClose(true);
        setDatastep(data[i].steps);
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
                                    data.length > 0 && (
                                        data.map((data:any, i) =>  {  
                                            let count = 0;
                                            for (let j = 0; j < data.steps.length; j++) {
                                                if(data?.steps[j]?.status === 'done'){
                                                    count++;
                                                }
                                            }
                                            return(
                                            <div onClick={()=>handleClick(i)} key={i} className="h-[30vh] w-[20vw] overflow-hidden bg-white/50 shadow-xl rounded-xl p-2 flex flex-col justify-between cursor-pointer" >
                                                <div className="">
                                                    <h1 className="text-2xl font-bold">{data?.title}</h1>
                                                    <h2>Total Steps : {data?.steps?.length}</h2>
                                                    <h2>Completed Steps: {count}</h2>
                                                </div>
                                                <div className=" flex gap-5 mx-auto">
                                                    <Button variant={'secondary'} className="shadow-lg cursor-pointer mb-5"><Trash /></Button>
                                                    <Button variant={'secondary'} className="shadow-lg cursor-pointer mb-5"><Download /></Button>
                                                </div>
                                            </div>
                                            )                 
                                        })
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
                                datastep.map((data:any,i) => (
                                    <div className="w-[80%] h-[50%] justify-between flex flex-col gap-5 bg-gray-200 p-2 shadow-lg rounded-xl">
                                        <h1 className="text-4xl font-semibold">{data.title}</h1>
                                        <h1 className="">Status: <span className="">{data?.status}</span></h1>
                                        <Button className="cursor-pointer">Mark as Done</Button>
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