"use client"

import Link from "next/link";
import { useState } from "react";

interface ColorPalette {
  colors: string[]
}

const colorPalettes: ColorPalette[] = [
  {
    colors: ["#1a1a1a", "#ef715d"]
  },
  {
    colors: ["#BABFF2", "#7B84D1", "#444AAB", "#1E2D76"]
  },
  {
    colors: ["#EBBB4C", "#7E8CC8", "#3C4390", "#E07B3E"]
  },
  {
    colors: ["#F7AF69", "#F79D64", "#F4805D", "#F26A5A", "#F26454"]
  },
  {
    colors: ["#4E795E", "#3F644D", "#2E4734", "#1D2617"]
  }
]

export default function Home() {
  const [currentColor, setCurrentColor] = useState<ColorPalette>(colorPalettes[Math.floor(Math.random() * colorPalettes.length)])

  const [canvasWidth, setCanvasWidth] = useState<number>(320)
  const [canvasHeight, setCanvasHeight] = useState<number>(451)

  const [rows, setRows] = useState<number>(8)
  const [columns, setColumns] = useState<number>(6)
  
  const [paddingX, setPaddingX] = useState<number>(45)
  const [paddingY, setPaddingY] = useState<number>(65)

  const [circleScale, setCircleScale] = useState<number>(0.3132 / columns)

  return (
    <div className="flex h-[95vh] flex-col gap-8 md:gap-8 items-center justify-center roboto text-sm font-medium" style={{ backgroundColor: "#f8f6f1" }}>
      <p style={{ width: "320px" }}>Hello! I'm Marius.<br />Developer & Founder based in Germany.</p>
      <div className="shadow-2xl">
        <svg
          width={canvasWidth}
          height={canvasHeight}
          viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <rect
            x="0"
            y="0"
            width={canvasWidth}
            height={canvasHeight}
            fill="#F1EAD8"
          />
          {Array.from({ length: rows }).flatMap((_, row) =>
            Array.from({ length: columns }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * ((canvasWidth - (2 * paddingX)) / (columns - 1)) + paddingX}
                cy={row * ((canvasHeight - (2 * paddingY)) / (rows - 1)) + paddingY}
                r={canvasWidth * circleScale}
                fill={
                  currentColor.colors[
                  Math.floor(Math.random() * currentColor.colors.length)
                  ]
                }
              />
            ))
          )}
        </svg>
      </div>
      <div className="flex flex-row gap-8 items-center">
        <Link href="https://github.com/248studios">GITHUB</Link>
        <Link href="https://248studios.com">248 STUDIOS</Link>
        <Link href="/about">ABOUT</Link>
      </div>
    </div>
  );
}
