"use client";

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function CircularTimer({
  duration,
  redirectPath,
  size = "sm",
  onComplete,
}) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);
  const alertShownRef = useRef(false);

  // Calculate sizes based on the size prop
  const sizeClasses = {
    sm: "w-24 h-24 text-xl",
    md: "w-42 h-42 text-3xl",
    lg: "w-64 h-64 text-4xl",
  };

  // Calculate progress percentage
  const progress = ((duration - timeLeft) / duration) * 100;
  const circumference = 2 * Math.PI * 47; // 47 is the radius of the circle

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        // Check if we've reached 80% completion (or 20% remaining)
        if (!alertShownRef.current && prevTime <= duration * 0.2) {
          alertShownRef.current = true;
          toast.info("80% من وقت الاختبار قد انقضى");
        }

        if (prevTime <= 1) {
          clearInterval(interval);
          setIsActive(false);

          if (onComplete) {
            onComplete();
          }

          // Navigate to the specified path
          navigate(redirectPath);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, redirectPath, navigate, onComplete, duration]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className={`relative flex items-center justify-center ${sizeClasses[size]}`}
    >
      {/* Background circle */}
      <div className="absolute inset-0 rounded-full bg-gray-100"></div>

      {/* SVG for progress circle */}
      <svg
        className="absolute inset-0 -rotate-90 transform"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className={"stroke-gray-300"}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          strokeLinecap="round"
        />
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className={"stroke-primary soft"}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
          strokeLinecap="round"
        />
      </svg>

      {/* Timer display */}
      <div className="z-10 flex flex-col items-center justify-center text-primary">
        <span className="font-mono text-md font-bold">
          {formatTime(timeLeft)}
        </span>
        <span className=" text-sm font-semibold">
          {timeLeft > 0 ? "متبقي" : "انتهى الوقت"}
        </span>
      </div>
    </div>
  );
}
