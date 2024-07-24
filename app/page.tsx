'use client'

import { useEffect, useState } from 'react'
import TomatoesRow from './ui/tomatoes-row'
import Timer from './ui/timer'
import RelaxTimer from './ui/relax-timer'
import ChosenTime from './ui/chosen-time'
import {
  getTotalSecsFromTimeObj,
  getSelectValues,
  getSelectValuesRelax,
  fireToast,
  makeStartSound,
} from './lib/utils'
import TomatoTimeSelect from './ui/tomato-time-select'
import RelaxTimeSelect from './ui/relax-time-select'
import ManageButtonsContainer from './ui/manage-btns-container'
import StatusBar from './ui/status-bar'
import Toast from './ui/toast'

export default function Page() {
  const [secs, setSecs] = useState(0)
  const [secsRelax, setSecsRelax] = useState(0)
  const [chosenTime, setChosenTime] = useState(0)
  const [chosenTimeRelax, setChosenTimeRelax] = useState(0)
  const [tomatoesDone, setTomatoesDone] = useState(0)
  // status: 'going...', 'pausing...', 'non-active', 'relax waiting', 'relaxing...', 'pausing relax...'
  const [status, setStatus] = useState('non-active')

  // main use effect. makes timer work. called in root
  useEffect(() => {
    let intervalId = setInterval(() => {
      if (chosenTime !== 0 && secs >= chosenTime) {
        setStatus('relax waiting')
        setSecs(0)
        setChosenTime(0)
        setTomatoesDone(tomatoesDone + 1)
        const audio = new Audio('/end.mp3')
        audio.play()

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
        const audio = new Audio('/end.mp3')
        audio.play()
        
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

  const goHandler = function () {
    if (status === 'relax waiting') {
      if (getTotalSecsFromTimeObj(getSelectValuesRelax()) === 0) return
      makeStartSound()

      fireToast('toast_start_relax')
      setStatus('relaxing...')
      setChosenTimeRelax(getTotalSecsFromTimeObj(getSelectValuesRelax()))
    } else if (status === 'pausing relax...') {
      fireToast('toast_continue_relax')
      setStatus('relaxing...')
    } else if (status === 'non-active' || status === 'relaxed') {
      if (getTotalSecsFromTimeObj(getSelectValues()) === 0) return
      makeStartSound()

      fireToast('toast_start')
      setStatus('going...')
      setChosenTime(getTotalSecsFromTimeObj(getSelectValues()))
    } else if (status === 'pausing...') {
      fireToast('toast_continue')
      setStatus('going...')
    }
  }
  const takePauseHandler = function () {
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

      {/* absolute positioned toast */}
      <Toast id='toast_start' message='You started tomato!' />
      <Toast id='toast_start_relax' message='You started relaxing' />
      <Toast id='toast_continue' message='You continued tomato!' />
      <Toast id='toast_continue_relax' message='You continued relaxing' />
  
      
      <h1 className="font-semibold text-[25px] sm:text-[35px] lg:text-[50px] pt-2 mb-4 sm:mb-6 lg:mb-10 text-red-500 text-center">
        Tomato focus
      </h1>
      <div className="grid">
        {/* tomatoes row */}
        <TomatoesRow tomatoesDone={tomatoesDone} />

        {/* timer & relax */}
        <Timer status={status} secs={secs} />
        <RelaxTimer status={status} secsRelax={secsRelax} />

        {/* chosen (goal) time */}
        <ChosenTime
          status={status}
          chosenTime={chosenTime}
          chosenTimeRelax={chosenTimeRelax}
        />

        {/* select time */}
        <div>
          {/* container for the tomato time select */}
          {(status === 'non-active' || status === 'relaxed') && (
            <TomatoTimeSelect />
          )}

          {/* container for the relax time select */}
          {status === 'relax waiting' && (
            <RelaxTimeSelect tomatoesDone={tomatoesDone} />
          )}
        </div>

        {/* management buttons */}
        <ManageButtonsContainer status={status} goHandler={goHandler} resetHandler={resetHandler} takePauseHandler={takePauseHandler} />
        
        {/* statusbar */}
        <StatusBar status={status} tomatoesDone={tomatoesDone} />
      </div>
    </div>
  )
}
