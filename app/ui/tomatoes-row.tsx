import Tomato from "./tomato"


export default function TomatoesRow({ tomatoesDone }: { tomatoesDone: number }) {
  const tomatoesArrayPlaceholder = Array.from(
    { length: tomatoesDone },
    (x, i) => i
  )
  
  return (
    <div className="flex min-h-[102px] flex-wrap mb-10 gap-x-1 sm:gap-x-4 md:gap-x-6 lg:gap-x-7 gap-y-3 sm:gap-y-6 md:gap-y-8 lg:gap-y-10 border-red-200 border-2 pt-5 pb-2 px-4 rounded-md">
      {tomatoesArrayPlaceholder.map((item, index) => (
        <Tomato key={index} />
      ))}
      {tomatoesDone === 0 && (
        <span className="text-[24px] sm:text-[32px] md:text-[44px] lg:text-[56px]">
          Done Tomatoes will appear here...
        </span>
      )}
    </div>
  )
}
