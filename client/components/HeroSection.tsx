import { Sparkle } from "lucide-react";
import SplineScreen from "./Spline";

export default function HeroSection() {
    return (
        <>
            <div className="h-screen relative w-full ">
                <SplineScreen />
            </div>
            <div className="z-1 py-6 px-5 lg:p-2 absolute top-1/2 left-1/2 -translate-1/2 flex lg:justify-center lg:items-center bg-transparent h-screen w-full lg:gap-64 ">
                <span className="bg-transparent lg:text-[8rem] 2xl:text-[12rem] uppercase font-semibold ">Skill</span>
                <span className="bg-transparent lg:text-[6rem] 2xl:text-[9rem] uppercase font-semibold ">Route</span>
            </div>
            <div className="absolute lg:hidden text-2xl text-black top-1/2 -translate-y-1/2 left-[40%] -translate-x-1/2 font-bold backdrop-invert-75 rounded-xl pr-10">
                <span className="uppercase text-7xl">SKILL <br /> Route</span>
            </div>
            <div className="absolute lg:top-[25vh] lg:left-[3vw] top-[15vh] flex justify-center items-center lg:items-start lg:justify-start left-1/2 -translate-x-1/2 lg:-translate-x-0 w-full z-1">
                <span className="text-[1.25rem] 2xl:text-[3rem] font-medium flex items-center gap-5"><Sparkle className="text-[#DC143C] 2xl:text-[2.45rem]" /> AI-Powered Learning Paths Just for You <Sparkle className="text-[#DC143C] 2xl:text-[2.45rem] " /></span>
            </div>
            <div className="w-full lg:w-[20%] 2xl:w-[25%] lg:text-[2rem] text-xl 2xl:text-[4rem] overflow-hidden flex-wrap bg-transparent absolute z-[2] lg:bottom-15 lg:right-20 text-center font-light bottom-0 ">
                <span>Let smart AI agents guide your journey to mastering any skill, one step at a time</span>
            </div>
            <div className="flex flex-col absolute left-1/2 -translate-x-1/2 w-[80%] right-1/2 bottom-10 lg:bottom-0 m-10 lg:left-0 lg:right-0 lg:-translate-x-0 lg:m-20 gap-5 ">
                <span className="font-semibold text-[1rem] lg:font-bold lg:text-[1.2em] 2xl:text-[3rem]">🚀 Personalized AI Agents</span>
                <span className="font-semibold text-[1rem] lg:font-bold lg:text-[1.2em] 2xl:text-[3rem]">🧠 Adaptive Learning Plans</span>
                <span className="font-semibold text-[1rem] lg:font-bold lg:text-[1.2em] 2xl:text-[3rem]">📊 Progress & Milestones</span>
            </div>
        </>
    )
}