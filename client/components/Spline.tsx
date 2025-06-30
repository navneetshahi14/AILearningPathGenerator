'use client'

import Spline from "@splinetool/react-spline"

export default function SplineScreen(){
    return (
        <>
            <div className="w-full h-screen absolute -top-12 lg:top-0 bottom-10 -right-[20%] lg:right-0 overflow-hidden">
                {/* <Spline scene="https://prod.spline.design/qlqeoLnyK063ZyDw/scene.splinecode" /> */}
                <Spline className="lg:scale-[0.95] 2xl:scale-[1.8] scale-[0.5]" scene="https://prod.spline.design/qlqeoLnyK063ZyDw/scene.splinecode" />
            </div>
        </>
    )
}