import { ReactElement } from "react";
import { cn } from "@/lib/utils";
const handlePasswordStrength = (strength: "weak" | "okay" | "strong") => {
  switch (strength) {
    case "weak":
      return "bg-red-500";
    case "okay":
      return "bg-amber-500";
    case "strong":
      return "bg-green-500";
    default:
      return "bg-red-500";
  }
};

const handlePasswordStrengthText = (strength: "weak" | "okay" | "strong") => {
  switch (strength) {
    case "weak":
      return "text-red-500";
    case "okay":
      return "text-amber-500";
    case "strong":
      return "text-green-500";
    default:
      return "text-red-500";
  }
};
export function PasswordStrengthLine({
  strength,
}: {
  strength: "weak" | "okay" | "strong";
}): ReactElement {
  return (
    <div className="w-full">
      <div
        className={cn(
          "h-2 rounded transition-colors duration-300",
          handlePasswordStrength(strength),
        )}
      ></div>
      <div className="text-center mt-2">
        {strength && (
          <span
            className={cn(
              "text-lg font-semibold",
              handlePasswordStrengthText(strength),
            )}
          >
            {strength.charAt(0).toUpperCase() + strength.slice(1)}
          </span>
        )}
      </div>
    </div>
  );
}
