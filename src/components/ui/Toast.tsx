import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface ToastProps {
  message: string;
  type?: "success" | "error";
}

export const Toast = ({ message, type = "success" }: ToastProps) => {
  return (
    <div className="mt-16 bg-black/30 backdrop-blur-md border border-white/10 text-white px-8 md:px-24 py-3 rounded-2xl flex items-center justify-center gap-3 shadow-xl animate-in fade-in zoom-in duration-300">
       <div className="flex items-center justify-center">
         {type === "success" ? (
           <CheckCircleIcon className="w-8 h-8 text-white" />
         ) : (
           <XCircleIcon className="w-8 h-8 text-red-500" />
         )}
       </div>
       <span className="font-medium whitespace-nowrap">{message}</span>
    </div>
  );
};
