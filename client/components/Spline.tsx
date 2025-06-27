'use client'

import Spline from "@splinetool/react-spline"

export default function SplineScreen(){
    return (
        <>
            <div className="w-full h-screen absolute top-0 bottom-10">
                {/* <Spline scene="https://prod.spline.design/qlqeoLnyK063ZyDw/scene.splinecode" /> */}
                <Spline scene="https://prod.spline.design/qlqeoLnyK063ZyDw/scene.splinecode" />
            </div>
        </>
    )
}