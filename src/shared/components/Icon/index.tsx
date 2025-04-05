import { SVGProps } from "react";
import { Sun, Moon } from "@/icons";
type IconName = "sun" | "moon";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case "sun":
      return <Sun {...props} />;
    case "moon":
      return <Moon {...props} />;
    default:
      return null;
  }
}
