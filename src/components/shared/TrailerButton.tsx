import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

interface TrailerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const TrailerButton = ({ className, ...props }: TrailerButtonProps) => {
  return (
    <Button
      variant="primary"
      className={cn(
        "bg-red-700 hover:bg-red-800 text-white rounded-full px-4 py-2 h-auto text-sm font-semibold gap-2 border-0 justify-center items-center transition-colors",
        className
      )}
      {...props}
    >
      <span>Watch Trailer</span>
      <PlayCircleIcon className="w-6 h-6 text-white " />
    </Button>
  );
};
