export default function TomatoTimeSelect() {
  return (
    <div className="min-h-16">
      <label className="text-lg mr-1" htmlFor="mins">
        minutes
      </label>
      <select
        className="bg-black font-semibold text-2xl p-0.5"
        name="mins"
        id="mins"
      >
        <option value="20">20</option>
        <option selected value="25">
          25
        </option>
        <option value="30">30</option>
        <option value="00">00</option> {/* line for dev */}
      </select>
      <label className="text-lg mr-1" htmlFor="secs">
        seconds
      </label>
      <select
        className="bg-black font-semibold text-2xl p-0.5"
        name="secs"
        id="secs"
      >
        <option value="5">05</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option selected value="00">
          00
        </option>
      </select>
    </div>
  )
}
