import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function ScheduleCalendar({
  selectedDate,
  setSelectedDate,
}) {

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">

      <h2 className="text-xl font-semibold mb-5">
        Schedule Planner
      </h2>

      <div className="calendar-dark">

        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
        />

      </div>

    </div>
  );
}