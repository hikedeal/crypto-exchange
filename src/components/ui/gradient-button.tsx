"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { motion } from "framer-motion";

const GradientButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block w-full sm:w-auto"
      >
        <Button
          ref={ref}
          className={cn(
            "w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 text-white border-0 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all font-medium",
            className
          )}
          {...props}
        />
      </motion.div>
    );
  }
);
GradientButton.displayName = "GradientButton";

export { GradientButton };
