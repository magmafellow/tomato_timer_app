export default function Timer({ secs }: { secs: number }) {
  return (
    <div className="text-[100px] font-semibold text-center">{secs}</div>
  )
}
