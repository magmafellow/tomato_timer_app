export default function RelaxTimeSelect({
  tomatoesDone,
}: {
  tomatoesDone: number
}) {
  return (
    <div className="min-h-16">
      <label className="text-lg mr-1" htmlFor="mins">
        minutes
      </label>
      <select
        className="bg-black font-semibold text-2xl p-0.5"
        name="mins_relax"
        id="mins_relax"
      >
        {tomatoesDone !== 0 && tomatoesDone % 4 === 0 ? (
          <>
            <option value="25">25</option>
            <option value="20">20</option>
            <option selected value="15">
              15
            </option>
            <option value="12">12</option>
            <option value="10">10</option>
            <option value="7">07</option>
            <option value="5">05</option>
            <option value="00">00</option> {/* line for dev */}
          </>
        ) : (
          <>
            <option selected value="5">
              05
            </option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="00">00</option> {/* line for dev */}
          </>
        )}
      </select>
      <label className="text-lg mr-1" htmlFor="secs">
        seconds
      </label>
      <select
        className="bg-black font-semibold text-2xl p-0.5"
        name="secs_relax"
        id="secs_relax"
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
      {/* message if long relax needed */}
      <div>
        {tomatoesDone !== 0 && tomatoesDone % 4 === 0 && (
          <p className="py-2 mb-2 mt-3 px-4 border border-green-300 text-green-300 bg-green-800 rounded">
            Man.. You have been doing well. Prolonged relax time is available
          </p>
        )}
      </div>
    </div>
  )
}
