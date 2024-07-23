'use client'

import Tomato from './ui/tomato'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

function getSelectValues() {
  const minutes = Number(document.querySelector('[id="mins"]')?.value)
  const seconds = Number(document.querySelector('[id="secs"]')?.value)

  return { minutes, seconds }
}

function getSelectValuesRelax() {
  const minutes = Number(document.querySelector('[id="mins_relax"]')?.value)
  const seconds = Number(document.querySelector('[id="secs_relax"]')?.value)

  return { minutes, seconds }
}

function getTotalSecsFromTimeObj(obj: {
  seconds: number
  minutes: number
}): number {
  return obj.seconds + obj.minutes * 60
}

function showTimeFromSeconds(allSeconds: number) {
  let minutes: string | number = Math.floor(allSeconds / 60)
  let seconds: string | number = allSeconds % 60
  if (minutes < 10) minutes = '0' + minutes
  if (seconds < 10) seconds = '0' + seconds

  return `${minutes}:${seconds}`
}

export default function Page() {
  const [secs, setSecs] = useState(0)
  const [secsRelax, setSecsRelax] = useState(0)
  const [chosenTime, setChosenTime] = useState(0)
  const [chosenTimeRelax, setChosenTimeRelax] = useState(0)
  const [tomatoesDone, setTomatoesDone] = useState(0)
  // status: 'going...', 'pausing...', 'non-active', 'relax waiting', 'relaxing...'
  const [status, setStatus] = useState('non-active')

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (chosenTime !== 0 && secs >= chosenTime) {
        setStatus('relax waiting')
        setSecs(0)
        setChosenTime(0)
        setTomatoesDone(tomatoesDone + 1)

        return
      }
      if (status === 'going...') {
        setSecs(secs + 1)
      }
    }, 1000)

    let intervalIdRelax = setInterval(() => {
      if (chosenTimeRelax !== 0 && secsRelax >= chosenTimeRelax) {
        setStatus('relaxed')
        setSecsRelax(0)
        setChosenTimeRelax(0)

        return
      }
      if (status === 'relaxing...') {
        setSecsRelax(secsRelax + 1)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
      clearInterval(intervalIdRelax)
    }
  })

  const tomatoesArrayPlaceholder = Array.from(
    { length: tomatoesDone },
    (x, i) => i
  )

  const goHandler = function () {
    if (status === 'relax waiting') {
      if (getTotalSecsFromTimeObj(getSelectValuesRelax()) === 0) return
      setStatus('relaxing...')
      setChosenTimeRelax(getTotalSecsFromTimeObj(getSelectValuesRelax()))
    } else if (status === 'pausing relax...') {
      setStatus('relaxing...')
    } else if (status === 'non-active' || status === 'relaxed') {
      if (getTotalSecsFromTimeObj(getSelectValues()) === 0) return
      setStatus('going...')
      setChosenTime(getTotalSecsFromTimeObj(getSelectValues()))
    } else if (status === 'pausing...') {
      setStatus('going...')
    }
    // else if (
    //   status === 'non-active' ||
    //   status === 'relaxed' ||
    //   status === 'pausing...'
    // ) {
    //   if (getTotalSecsFromTimeObj(getSelectValues()) === 0) return
    //   setStatus('going...')
    //   setChosenTime(getTotalSecsFromTimeObj(getSelectValues()))
    // }
  }
  const takePause = function () {
    if (status === 'relaxing...') {
      setStatus('pausing relax...')
    } else if (status === 'going...') {
      setStatus('pausing...')
    }
  }
  const resetHandler = function () {
    if (status === 'relaxing...' || status === 'pausing relax...') {
      setStatus('relax waiting')
      setSecsRelax(0)
      setChosenTimeRelax(0)
    } else if (status === 'going...' || status === 'pausing...') {
      setStatus('non-active')
      setSecs(0)
      setChosenTime(0)
    }
  }

  return (
    <div className="px-2">
      <h1 className="font-semibold text-[25px] sm:text-[35px] lg:text-[50px] pt-2 mb-4 sm:mb-6 lg:mb-10 text-red-500 text-center">
        Tomato focus
      </h1>
      <div className="grid">
        {/* tomatoes */}
        <div className="flex min-h-[102px] flex-wrap mb-10 gap-10 border-red-200 border-2 pt-5 pb-2 px-4 rounded-md">
          {tomatoesArrayPlaceholder.map((item, index) => (
            <Tomato key={index} />
          ))}
          {tomatoesDone === 0 && (
            <span className="text-[24px] sm:text-[32px] md:text-[44px] lg:text-[56px]">
              Done Tomatoes will appear here...
            </span>
          )}
        </div>
        {/* timer or relax */}
        <div
          className={clsx(
            'text-[50px] sm:text-[70px] md:text-[80px] lg:text-[100px] mb-4 sm:mb-7 font-semibold text-center',
            {
              'text-neutral-600':
                status === 'relax waiting' ||
                status === 'relaxing...' ||
                status === 'pausing relax...',
              'text-white':
                status !== 'relax waiting' &&
                status !== 'relaxing...' &&
                status !== 'pausing relax...',
            }
          )}
        >
          {showTimeFromSeconds(secs)}
        </div>
        {(status === 'relax waiting' ||
          status === 'relaxing...' ||
          status === 'pausing relax...') && (
          <div className="text-[30px] sm:text-[40px] md:text-[42px] lg:text-[45px] font-semibold text-center">
            {showTimeFromSeconds(secsRelax)}
          </div>
        )}

        {/* <Timer secs={secs} /> */}

        {/* chosen time */}
        <div>
          {(status === 'pausing...' || status === 'going...') && (
            <p className="text-xl tracking-wider">
              Tomato time{' '}
              <span className="text-2xl bg-neutral-700 rounded border border-neutral-200 py-0.5 px-1">
                {showTimeFromSeconds(chosenTime)}
              </span>
            </p>
          )}
          {(status === 'relaxing...' || status === 'pausing relax...') && (
            <p className="text-xl">
              Relax time{' '}
              <span className="text-2xl bg-neutral-700 rounded border border-neutral-200 py-0.5 px-1">
                {showTimeFromSeconds(chosenTimeRelax)}
              </span>
            </p>
          )}
        </div>

        {/* input */}
        <div>
          {/* container for tomato time */}
          {/* (status !== 'relax waiting' &&
            status !== 'relaxing...' &&
            status !== 'pausing relax...') */}
          {(status === 'non-active' || status === 'relaxed') && (
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
                <option selected value="25">
                  25
                </option>
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
                <option value="5">05</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option selected value="00">
                  00
                </option>
              </select>
            </div>
          )}

          {/* container for relax time */}
          {/* (status === 'relax waiting' ||
            status === 'relaxing...' ||
            status === 'pausing relax...') */}
          {status === 'relax waiting' && (
            <div>
              <label className="text-lg mr-1" htmlFor="mins">
                minutes
              </label>
              <select
                className="bg-black font-semibold text-2xl p-0.5"
                name="mins_relax"
                id="mins_relax"
              >
                {tomatoesDone !== 0 && tomatoesDone % 4 === 0 ? (
                  <>
                    <option value="20">20</option>
                    <option selected value="15">
                      15
                    </option>
                    <option value="12">12</option>
                    <option value="10">10</option>
                  </>
                ) : (
                  <>
                    <option selected value="5">
                      05
                    </option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                  </>
                )}
              </select>
              <label className="text-lg mr-1" htmlFor="secs">
                seconds
              </label>
              <select
                className="bg-black font-semibold text-2xl p-0.5"
                name="secs_relax"
                id="secs_relax"
              >
                <option value="5">05</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option selected value="00">
                  00
                </option>
              </select>
            </div>
          )}

          <div className="flex gap-10 justify-center py-10">
            <button
              className="py-2 px-4 rounded bg-gray-500 font-semibold"
              onClick={takePause}
            >
              Pause
            </button>
            <button
              className="py-2 px-4 rounded bg-amber-500 font-semibold"
              onClick={goHandler}
            >
              {status === 'relax waiting' || status === 'pausing relax...'
                ? 'relax'
                : 'GO!'}
            </button>
            <button
              className="py-2 px-4 rounded bg-red-800 font-semibold"
              onClick={resetHandler}
            >
              Reset
            </button>
          </div>
        </div>
        {/* statusbar */}
        <div className="text-lg">
          <div className="text-sky-300">
            <span>status: </span> <span className="font-bold">{status}</span>
          </div>
          <div className="text-emerald-300">
            {' '}
            <span>All done: </span>{' '}
            <span className="font-bold">{tomatoesDone}</span>{' '}
          </div>
        </div>
      </div>
    </div>
  )
}
