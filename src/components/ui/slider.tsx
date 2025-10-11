"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex touch-none select-none items-center",
      props.orientation === "vertical"
        ? "h-full flex-col"
        : "w-full",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className={cn("relative grow overflow-hidden rounded-full bg-white/20",
      props.orientation === "vertical" ? "w-1.5 h-full" : "h-1.5 w-full"
    )}>
      <SliderPrimitive.Range className={cn("absolute bg-white",
        props.orientation === "vertical" ? "w-full" : "h-full"
      )} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border-2 border-white bg-gray-800 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
