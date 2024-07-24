import { showTimeFromSeconds } from "../lib/utils"


export default function ChosenTime({ status, chosenTime, chosenTimeRelax }: { status: string, chosenTime: number, chosenTimeRelax: number }){
  return (
    <div>
          {(status === 'pausing...' || status === 'going...') && (
            <p className="text-xl tracking-wider min-h-16">
              Tomato time{' '}
              <span className="text-2xl bg-neutral-700 rounded border border-neutral-200 py-0.5 px-1">
                {showTimeFromSeconds(chosenTime)}
              </span>
            </p>
          )}
          {(status === 'relaxing...' || status === 'pausing relax...') && (
            <p className="text-xl min-h-16">
              Relax time{' '}
              <span className="text-2xl bg-neutral-700 rounded border border-neutral-200 py-0.5 px-1">
                {showTimeFromSeconds(chosenTimeRelax)}
              </span>
            </p>
          )}
        </div>
  )
}