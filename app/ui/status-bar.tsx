export default function StatusBar({ status, tomatoesDone }: { status: string, tomatoesDone: number  }) {
  return (
    <div className="text-lg">
      <div className="text-sky-300">
        <span>status: </span> <span className="font-bold">{status}</span>
      </div>
      <div className="text-emerald-300">
        {' '}
        <span>Total done: </span>{' '}
        <span className="font-bold">{tomatoesDone}</span>{' '}
      </div>
    </div>
  )
}
