/*export default function StatusBar() {
  return (
    <div className="flex justify-between items-center mb-8">

      <h1 className="text-xl font-semibold tracking-wide">
        FlowState
      </h1>

      <div className="flex items-center gap-2 text-sm text-blue-400">
        <span>🔥</span>
        <span>Streak 7</span>
      </div>

    </div>
  );
}*/
export default function StatusBar() {
  return (
    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-xl font-semibold tracking-wide">
          FlowState
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          Productivity OS
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-sm text-blue-400">
          🔥 Streak 7
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400">

          <span>⌘</span>
          <span>K</span>

        </div>

      </div>

    </div>
  );
}