import { Calendar } from "./components/Calendar/Calendar";

function App() {
  return (
    <div>
      <Calendar monthName="مهر" daysInMonth={30} startDay={2} />
    </div>
  );
}

export default App;
