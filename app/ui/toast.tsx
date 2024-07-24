export default function Toast({ message, id }: { message: string, id: string }) {
  return (
    <div className='toast' id={id}>{message}</div>
  )
}