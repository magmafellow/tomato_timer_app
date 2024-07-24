import { showTimeFromSeconds } from '../lib/utils'

export default function RelaxTimer({
  status,
  secsRelax,
}: {
  status: string
  secsRelax: number
}) {
  return (
    (status === 'relax waiting' ||
      status === 'relaxing...' ||
      status === 'pausing relax...') && (
      <div className="text-[30px] mb-3 sm:text-[40px] md:text-[42px] lg:text-[45px] font-semibold text-center">
        {showTimeFromSeconds(secsRelax)}
      </div>
    )
  )
}
