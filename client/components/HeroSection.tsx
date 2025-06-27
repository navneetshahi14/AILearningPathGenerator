import { Sparkle } from "lucide-react";
import SplineScreen from "./Spline";

export default function HeroSection() {
    return (
        <>
            <div className="h-[100vh] relative w-full ">
                <SplineScreen />
            </div>
            <div className="z-1  absolute top-1/2 left-1/2 -translate-1/2 flex justify-center items-center bg-transparent h-screen w-full gap-64">
                <span className="bg-transparent text-[8rem] uppercase font-semibold">Skill</span>
                <span className="bg-transparent text-6xl uppercase font-semibold ">Route</span>
            </div>
            <div className="absolute top-[25vh] left-[3vw] z-1">
                <span className="text-[1.25rem] font-medium flex items-center gap-5"><Sparkle className="text-[#DC143C]" /> AI-Powered Learning Paths Just for You <Sparkle className="text-[#DC143C]" /></span>
            </div>
            <div className="w-[20%] text-[2rem] overflow-hidden flex-wrap bg-transparent absolute z-[2] bottom-15 right-20 text-center font-light">
                <span>Let smart AI agents guide your journey to mastering any skill, one step at a time</span>
            </div>
            <div className="flex flex-col absolute left-0 bottom-0 m-20 gap-5">
                <span className="font-bold text-[1.2em]">🚀 Personalized AI Agents</span>
                <span className="font-bold text-[1.2em]">🧠 Adaptive Learning Plans</span>
                <span className="font-bold text-[1.2em]">📊 Progress & Milestones</span>
            </div>
        </>
    )
}