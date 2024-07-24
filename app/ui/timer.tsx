import clsx from "clsx"
import { showTimeFromSeconds } from "../lib/utils"

export default function Timer({ status, secs }: { secs: number, status: string }) {
  return (
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
  )
}
