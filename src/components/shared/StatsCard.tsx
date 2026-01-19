import { cn } from "../../lib/utils";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}

export const StatsCard = ({ icon, label, value, className }: StatsCardProps) => {
  return (
    <div className={cn("bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center", className)}>
      <div className="flex justify-center mb-2">
        {icon}
      </div>
      <div className="text-xs text-gray-200 uppercase tracking-wider mb-1">{label}</div>
      <div className="font-bold text-lg">{value}</div>
    </div>
  );
};
