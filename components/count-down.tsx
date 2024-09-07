"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// COUNDOWN FUNCTION (MAIN) OR (COMPONENT)  ye hamara component hai
export default function CountDown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // TIMER START FUNCTION
  const handelStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  //   TIMER PAUSE FUNCTION
  const handelPause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  //  HANDEL RESET FUNCTION
  const handelReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  //   TIMER CHALANE KE LIYE FUNCTION
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // CLAENUP FUNCTION
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  // TIME MINUTES MINUTES TO SECOND
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60); // SECONDS KO MINUTES ME CONVERT KRDEGA
    const seconds = time % 60; // MINUTES KO SECONDS ME CONVERT KR KE DEGA
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // INPUT VALUE HANDEL FUNCTION
  const handelDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white space-y-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6">Countdown Timer</h1>

      {/* Countdown Display */}
      <div className="grid grid-cols-2 gap-6 text-center">
        <div>
          <span className="block text-6xl font-extrabold">
            {formatTime(timeLeft).split(":")[0]}
          </span>
          <span className="block text-lg mt-2">Minutes</span>
        </div>
        <div>
          <span className="block text-6xl font-extrabold">
            {formatTime(timeLeft).split(":")[1]}
          </span>
          <span className="block text-lg mt-2">Seconds</span>
        </div>
      </div>

      {/* Input Field */}
      <div className="flex flex-col items-center space-y-4">
        <Input
          type="number"
          placeholder="Enter time in seconds"
          value={typeof duration === "number" ? duration : ""}
          onChange={handelDurationChange}
          className="px-4 py-2 text-white bg-gray-700 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button
          onClick={handleSetDuration}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
        >
          Set Duration
        </Button>
      </div>

      {/* Buttons */}
      <div className="space-x-4">
        {/* **Resume Button Logic Added** */}
        {!isActive ? (
          <Button
            onClick={handelStart}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
          >
            Start
          </Button>
        ) : isPaused ? (
          <Button
            onClick={handelStart}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
          >
            Resume
          </Button>
        ) : (
          <Button
            onClick={handelPause}
            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md"
          >
            Resume
          </Button>
        )}
        <Button
          onClick={handelReset}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
