import { useState, useEffect } from "react";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";

export default function Options() {
  const [options, setOptions] = useState(() => {
    const saved = localStorage.getItem("feedback");
    return saved ? JSON.parse(saved) : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(options));
  }, [options]);

  const updateOptionsCount = (optionsType) => {
    setOptions((prev) => ({
      ...prev,
      [optionsType]: prev[optionsType] + 1,
    }));
  };

  const total = options.good + options.neutral + options.bad;

  return (
    <div>
      <button onClick={() => updateOptionsCount("good")}>Good</button>
      <button onClick={() => updateOptionsCount("neutral")}>Neutral</button>
      <button onClick={() => updateOptionsCount("bad")}>Bad</button>
      {total > 0 && (
        <button onClick={() => setOptions({ good: 0, neutral: 0, bad: 0 })}>
          Reset
        </button>
      )}

      {total > 0 ? (
        <Feedback
          good={options.good}
          neutral={options.neutral}
          bad={options.bad}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
