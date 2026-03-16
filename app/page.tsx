"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const typedSequence = ["Programmer", "Designer", "Developer", "Freelancer"];
const typingSpeed = 100;
const deleteSpeed = 50;
const pauseTime = 2000;

const Status = [
  "Status: Fixing my Broken Ass Arch Linux Install",
  "Status: Chewing Ass and Kicking Vim",
  "Status: Centering a Div (Send Help)",
  "Status: Watching YouTube Tutorials on How to Program for Beginners",
];
const randomIndex = Math.floor(Math.random() * Status.length);

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [_statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    setStatusIndex(Math.floor(Math.random() * Status.length));
  }, []);

  useEffect(() => {
    const currentText = typedSequence[sequenceIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, displayText.length - 1));
        }, deleteSpeed);
      } else {
        // Move to next sequence
        setSequenceIndex((prev) => (prev + 1) % typedSequence.length);
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, sequenceIndex, isDeleting]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 text-center font-mono">
      <h1 className="text-4xl font-bold">
        Charlie Brown{" "}
        <code className="font-mono bg-gray-500 rounded px-1">
          {displayText}
          <span className="animate-pulse">|</span>
        </code>
      </h1>
      <Link href="/about">
        <Button>See More</Button>
      </Link>
      <h2 className="flex font-mono color-gray-500 text-sm">
        {Status[randomIndex]}
      </h2>
    </div>
  );
}
