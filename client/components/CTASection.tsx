import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function CTASection(){
    return (
        <>
            <div className="h-screen w-full flex flex-col justify-between items-center py-10">
                <h1 className="text-center text-5xl uppercase mt-5 font-semibold">🚀 Ready to Level Up Your Skills?</h1>
                <h1 className="text-center text-6xl uppercase font-light px-44">Start your SkillRoute journey today with our AI agents.</h1>
                <div className=" flex gap-10">
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