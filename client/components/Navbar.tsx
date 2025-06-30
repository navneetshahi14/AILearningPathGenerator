import Link from "next/link"
import { Button } from "./ui/button"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Cog, Menu } from "lucide-react"
import { useState } from "react";

type NavbarProps = {
    closeing: boolean;
};


const Navbar = () => {
    const [closing, setClosing] = useState(false)
    const handleClose = () => {
        setClosing(!closing)
    }
    return (
        <>
                <div onClick={handleClose} className=" lg:hidden absolute right-0 top-0 bg-amber-100 p-2 m-5 rounded-full cursor-pointer z-[9999]">
                    <Menu className="text-xl" />
                </div>
            <nav className={`${closing ? "w-[80%] p-5" : "w-[0]"} h-screen lg:h-[8vh] lg:w-[80%] lg:rounded-full lg:bg-white/50 shadow-lg lg:mt-5 lg:px-10 lg:py-5 flex justify-between pb-10 lg:items-center flex-col lg:flex-row  gap-28 overflow-hidden absolute top-0 left-0 z-[999] bg-white/90 lg:left-1/2 lg:right-1/2 lg:-translate-x-1/2 transition-[width] duration-500 ease-in-out `}>
                <div className="">
                    <p className="lg:text-xl text-5xl font-semibold 2xl:text-3xl cursor-pointer">SkillRoute</p>
                </div>
                <div className="">
                    <ul className="flex lg:flex-row flex-col lg:gap-8 text-3xl lg:text-xl 2xl:text-3xl 2xl:gap-12 gap-10">
                        <li className="lg:hover:scale-[1.2] cursor-pointer hover:translate-x-4 duration-75 transition-all  ease-in-out">
                            <Link href={'/'}>Home</Link>
                        </li>
                        <SignedOut>
                            <li className="lg:hover:scale-[1.2] cursor-pointer hover:translate-x-4 duration-75 transition-all  ease-in-out">About</li>
                        </SignedOut>
                        <SignedIn>
                            <li className="lg:hover:scale-[1.2] cursor-pointer hover:translate-x-4 duration-75 transition-all ease-in-out"><Link href={'/generatePage'} >Generate Path</Link></li>
                            <li className="lg:hover:scale-[1.2] cursor-pointer hover:translate-x-4 duration-75 transition-all ease-in-out"><Link href={'/Learnings'} >Learnings</Link></li>
                        </SignedIn>
                    </ul>
                </div>
                <div className="flex gap-3 lg:flex-row flex-col justify-end items-start lg:items-center">
                    <SignedIn>
                        <Link href={'/profile'}>
                            <Cog className="cursor-pointer font-extrabold hidden 2xl:flex" height={45} width={45} />
                            <Cog className="cursor-pointer font-extrabold flex 2xl:hidden" />
                        </Link>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 2xl:w-[100%] 2xl:h-[100%] flex justify-center items-center">
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "w-full h-full", // fill the wrapper
                                    }
                                }}
                            />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <Button variant={'default'} className="cursor-pointer text-2xl lg:text-lg lg:rounded-full rounded-xl"><Link href={'/sign-in'}>Login</Link></Button>
                        <Button variant={'outline'} className="bg-white/50 border-black hover:bg-white cursor-pointer text-2xl lg:text-lg lg:rounded-full rounded-xl"><Link href={'/sign-up'}>SignUp</Link></Button>
                    </SignedOut>
                </div>

            </nav>
        </>
    )
}

export default Navbar