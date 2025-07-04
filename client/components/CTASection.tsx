import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function CTASection(){
    return (
        <>
            <div className="h-screen w-full flex flex-col justify-between items-center py-10">
                <h1 className="text-center text-lg lg:text-5xl 2xl:text-[6rem] uppercase mt-5 font-semibold">🚀 Ready to Level Up Your Skills?</h1>
                <h1 className="text-center text-3xl lg:text-6xl 2xl:text-[8rem] uppercase font-light px-10 lg:px-44">Start your SkillRoute journey today with our AI agents.</h1>
                <div className=" flex gap-10 lg:flex-row flex-col w-[80%] lg:items-center lg:justify-center">
                    <Button variant={'default'} className="px-10 py-8 text-2xl text-amber-200" >
                        <SignedIn>
                            <Link href={'/generatePage'}>Generate</Link>
                        </SignedIn>
                        <SignedOut>
                            <Link href={'/sign-up'}>Get Started</Link>
                        </SignedOut>
                    </Button>
                    <Button variant={'outline'} className="px-10 py-8 text-2xl" >Watch Demo</Button>
                </div>
            </div>
        </>
    )
}