import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <main className="h-screen w-full flex justify-center items-center bg-amber-200">
                <SignUp />
            </main>
        </>
    )
}