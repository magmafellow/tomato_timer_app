export default function ManageButtonsContainer({
  status,
  takePauseHandler,
  goHandler,
  resetHandler,
}: {
  status: string
  takePauseHandler: () => void
  goHandler: () => void
  resetHandler: () => void
}) {
  return (
    <div className="flex gap-10 justify-center py-10">
      <button
        className="py-2 px-4 rounded bg-gray-500 hover:bg-gray-700 active:scale-105 hover:outline hover:outline-1 hover:outline-gray-300 font-semibold"
        onClick={takePauseHandler}
      >
        Pause
      </button>
      <button
        className="py-2 px-4 rounded bg-amber-500 hover:bg-amber-600 active:scale-105 hover:outline hover:outline-1 hover:outline-amber-50 font-semibold"
        onClick={goHandler}
      >
        {status === 'relax waiting' || status === 'pausing relax...' || status === 'relaxing...'
          ? 'relax'
          : 'GO!'}
      </button>
      <button
        className="py-2 px-4 rounded bg-red-800 hover:bg-red-700 active:scale-105 hover:outline hover:outline-1 hover:outline-red-300 font-semibold"
        onClick={resetHandler}
      >
        Reset
      </button>
    </div>
  )
}
