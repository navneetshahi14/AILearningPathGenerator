import Image from "next/image";

export default function HowItWorks(){
    return (
        <>
            <div className="min-h-screen w-full flex justify-center items-center flex-col overflow-hidden">
                <div className="mt-5 lg:mt-0 lg:w-[5%] lg:h-[2vh] w-[10%] h-[1.5vh] bg-blue-500 rounded-full shadow "></div>
                <h1 className="text-center uppercase lg:text-4xl text-2xl font-semibold lg:mt-10 mt-5" >How It Works</h1>
                <div className="w-full flex flex-wrap items-center justify-center gap-10 mt-5">
                    <div className="lg:w-[30%] lg:min-h-[70vh] shadow-2xl bg-yellow-100 rounded-xl border-2 border-white flex justify-center items-center flex-col gap-10 ">
                        <Image src={'/goals.jpg'} alt="Goals" height={300} width={300} className="rounded-t-2xl" />
                        <p className="text-4xl font-semibold text-amber-400 ">Choose Your Goal</p>
                    </div>
                    <div className="lg:w-[30%] lg:min-h-[70vh] shadow-2xl bg-yellow-100 rounded-xl border-2 border-white flex justify-center items-center flex-col gap-10 ">
                        <Image src={'/Ai.jpg'} alt="Goals" height={300} width={300} className="rounded-t-2xl" />
                        <p className="text-4xl font-semibold text-amber-400 ">AI Builds Your Path</p>
                    </div>
                    <div className="lg:w-[30%] lg:min-h-[70vh] shadow-2xl bg-yellow-100 rounded-xl border-2 border-white flex justify-center items-center flex-col gap-10 ">
                        <Image src={'/track&Grow.jpg'} alt="Goals" height={300} width={300} className="rounded-t-2xl" />
                        <p className="text-4xl font-semibold text-amber-400 ">Track & Grow</p>
                    </div>
                </div>
            </div>
        </>
    )
}