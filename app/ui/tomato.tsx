'use client'

import clsx from 'clsx'
import { useState } from 'react'

export default function Tomato({
  saturate,
  scale,
}: {
  saturate?: string
  scale?: string
}) {
  const [countClicked, setCountClicked] = useState(0)

  const onClck = function (event: any) {
    // console.log(event.target)
    setCountClicked(countClicked + 1)
  }

  return (
    <div
      className={clsx(
        `${saturate} ${scale} cursor-pointer scale-75 sm:scale-[.95] md:scale-[1.05] lg:scale-[1.1] w-[100px] h-[70px] hover:bg-purple-600 rounded-[36px] relative border-4 border-red-950 outline outline-1 outline-red-300 transition-all`,
        {
          'bg-lime-600': countClicked > 9 && countClicked < 16,
          'bg-red-600': countClicked <= 9 || countClicked >= 16,
        }
      )}
      onClick={onClck}
    >
      {/* leaves */}
      <div className="h-[45px] w-[10px] bg-green-500 hover:bg-red-800 absolute left-7 -top-6 -rotate-45"></div>
      <div className="h-[40px] w-[8px] bg-green-500 hover:bg-slate-700 absolute left-16 -top-5 rotate-45"></div>
      <div className="h-[20px] w-[7px] bg-green-500 hover:bg-yellow-300 absolute left-12 -top-2 rotate-3"></div>

      {/* light */}
      <div className="h-3 w-3 bg-white hover:bg-emerald-400 rounded-full absolute left-16 top-8"></div>
    </div>
  )
}
