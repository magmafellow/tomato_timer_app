export default function() {
  return (
    <div className="flex justify-center items-center h-screen">
      {/* tomato */}
      <div className="w-[100px] h-[70px] bg-red-600 rounded-[36px] relative border-4 border-red-950 outline outline-1 outline-red-300">
        {/* leaves */}
        <div className="h-[45px] w-[10px] bg-green-500 absolute left-7 -top-6 -rotate-45"></div>
        <div className="h-[40px] w-[8px] bg-green-500 absolute left-16 -top-5 rotate-45"></div>
        <div className="h-[20px] w-[7px] bg-green-500 absolute left-12 -top-2 rotate-3"></div>

        {/* light */}
        <div className="h-3 w-3 bg-white rounded-full absolute left-16 top-8"></div>
      </div>
    </div>
  )
}