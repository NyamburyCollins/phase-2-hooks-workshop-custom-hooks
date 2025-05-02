import { useState, useEffect } from "react";

const activityEvents = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
];

export function useIdle(ms = 3000, eventTypes = activityEvents) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId;

    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), ms);
    };

    // Initialize the timeout
    timeoutId = setTimeout(() => setIsIdle(true), ms);

    // Add event listeners
    eventTypes.forEach(eventType => {
      window.addEventListener(eventType, handleActivity);
    });

    return () => {
      // Cleanup
      clearTimeout(timeoutId);
      eventTypes.forEach(eventType => {
        window.removeEventListener(eventType, handleActivity);
      });
    };
  }, [ms, eventTypes]);

  return isIdle;
}

export default function Idle() {
  const isIdle = useIdle(3000);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>useIdle Demo</h2>
      <h3>
        {isIdle ? (
          <span role="img" aria-label="idle">
            Idle 😴
          </span>
        ) : (
          <span role="img" aria-label="active">
            Active 🤠
          </span>
        )}
      </h3>
    </div>
  );
}