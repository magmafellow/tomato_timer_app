'use client'

import Tomato from './ui/page'
import { useState } from 'react'

function getSelectValues(){
  const minutes = document.querySelector('[id="mins"]')?.value
  const seconds = document.querySelector('[id="secs"]')?.value

  return {minutes, seconds}
}

export default function Page() {
  const [secs, setSecs] = useState(0)
  const [tomatoesDone, setTomatoesDone] = useState(0)
  const [status, setStatus] = useState('non-active')

  let secsId;
  
  const tomatoesArrayPlaceholder = Array.from({length: tomatoesDone}, (x, i) => i)
  
  const goHandler = function() {
    setStatus('going...')
    const {minutes, seconds} = getSelectValues()
    secsId = setInterval(()=>setSecs(secs+1), 1000)
  }
  const takePause = function() {
    setStatus('pausing..')
  }
  
  return (
    <div>
      <h1 className="font-semibold text-[50px] mb-10 text-red-500 text-center">
        Tomato focus
      </h1>
      <div className="grid">
        {/* tomatoes */}
        <div className="flex min-h-[102px] flex-wrap mb-10 gap-10 border-red-200 border-2 pt-5 pb-2 px-4 rounded-md">
          {tomatoesArrayPlaceholder.map(() => <Tomato />)}
          {tomatoesDone === 0 && <span className='text-[24px] sm:text-[32px] md:text-[44px] lg:text-[56px]'>Done Tomatoes will appear here...</span>}
        </div>
        {/* timer */}
        <div className="text-[100px] font-semibold text-center">{secs}</div>
        {/* input */}
        <div>
          <label className="text-lg mr-1" htmlFor="mins">
            minutes
          </label>
          <select
            className="bg-black font-semibold text-2xl p-0.5"
            name="mins"
            id="mins"
          >
            <option value="20">20</option>
            <option selected value="25">25</option>
            <option value="30">30</option>
          </select>
          <label className="text-lg mr-1" htmlFor="secs">
            seconds
          </label>
          <select
            className="bg-black font-semibold text-2xl p-0.5"
            name="secs"
            id="secs"
          >
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option selected value="00">
              00
            </option>
          </select>
          <div className='flex gap-10 justify-center py-10'>
            <button className='py-2 px-4 rounded bg-gray-500 font-semibold' onClick={takePause}>Pause</button>
            <button className='py-2 px-4 rounded bg-amber-500 font-semibold' onClick={goHandler}>GO!</button>
            <button className='py-2 px-4 rounded bg-red-800 font-semibold'>Reset</button>
          </div>
        </div>
        {/* statusbar */}
        <div className="text-lg">
          <div className="text-sky-300">
            <span>status: </span> <span className="font-bold">{status}</span>
          </div>
          <div className="text-emerald-300">
            {' '}
            <span>All done: </span> <span className="font-bold">{tomatoesDone}</span>{' '}
          </div>
        </div>
      </div>
    </div>
  )
}
