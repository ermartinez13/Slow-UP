import { useState } from "react";

import "./App.css";
import { Timer } from "./components/Timer";

function App() {
  const [totalTime, setTotalTime] = useState<number>(
    () => Number(window.localStorage.getItem("totalTime")) ?? 0
  );

  const updateTotalTime = (time: number) => {
    const nextValue = totalTime + time;
    window.localStorage.setItem("totalTime", nextValue.toString());
    setTotalTime(nextValue);
  };

  return <Timer totalTime={totalTime} updateTotalTime={updateTotalTime} />;
}

export default App;
