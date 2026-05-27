import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ProductivityChart({
  focusScore,
}) {

  const data = [
    {
      day: "Mon",
      score: 20,
    },

    {
      day: "Tue",
      score: 35,
    },

    {
      day: "Wed",
      score: 50,
    },

    {
      day: "Thu",
      score: 72,
    },

    {
      day: "Fri",
      score: focusScore,
    },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-[380px]">

      <div className="mb-6">

        <h2 className="text-2xl font-semibold">
          Focus Trend
        </h2>

        <p className="text-gray-400 mt-1">
          Weekly productivity performance
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height="80%"
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.08)"
          />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#60a5fa"
            strokeWidth={4}
            dot={{
              r: 6,
            }}

            activeDot={{
              r: 8,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}