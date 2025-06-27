import Image from "next/image";

export default function HowItWorks(){
    return (
        <>
            <div className="h-screen w-full flex justify-center items-center flex-col">
                <div className="w-[5%] h-[2vh] bg-blue-500 rounded-full shadow "></div>
                <h1 className="text-center uppercase text-4xl font-semibold mt-10" >How It Works</h1>
                <div className="w-full flex items-center justify-center gap-10 mt-5">
                    <div className="w-[30%] min-h-[70vh] shadow-2xl bg-yellow-100 rounded-xl border-2 border-white flex justify-center items-center flex-col gap-10 ">
                        <Image src={'/goals.jpg'} alt="Goals" height={300} width={300} className="rounded-t-2xl" />
                        <p className="text-4xl font-semibold text-amber-400 ">Choose Your Goal</p>
                    </div>
                    <div className="w-[30%] min-h-[70vh] shadow-2xl bg-yellow-100 rounded-xl border-2 border-white flex justify-center items-center flex-col gap-10 ">
                        <Image src={'/Ai.jpg'} alt="Goals" height={300} width={300} className="rounded-t-2xl" />
                        <p className="text-4xl font-semibold text-amber-400 ">AI Builds Your Path</p>
                    </div>
                    <div className="w-[30%] min-h-[70vh] shadow-2xl bg-yellow-100 rounded-xl border-2 border-white flex justify-center items-center flex-col gap-10 ">
                        <Image src={'/track&Grow.jpg'} alt="Goals" height={300} width={300} className="rounded-t-2xl" />
                        <p className="text-4xl font-semibold text-amber-400 ">Track & Grow</p>
                    </div>
                </div>
            </div>
        </>
    )
}