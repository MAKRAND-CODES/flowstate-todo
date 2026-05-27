export default function InsightsPanel({ tasks }) {

  return (
    <div className="hidden xl:flex flex-col gap-4 w-[300px]">

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

        <p className="text-sm text-gray-400 mb-2">
          Active Tasks
        </p>

        <h2 className="text-4xl font-bold">
          {tasks.length}
        </h2>

      </div>

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

        <p className="text-sm text-gray-400 mb-2">
          Current State
        </p>

        <h2 className="text-xl font-semibold">
          Deep Focus
        </h2>

      </div>

      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

        <p className="text-sm text-gray-400 mb-2">
          Productivity
        </p>

        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

          <div className="w-[78%] h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>

        </div>

      </div>

    </div>
  );
}