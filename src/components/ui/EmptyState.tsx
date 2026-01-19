import { Link } from "react-router-dom";
import { Button } from "./Button";

interface EmptyStateProps {
  image: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
}

export const EmptyState = ({ 
  image, 
  title, 
  description, 
  actionLabel, 
  actionLink 
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
       <img src={image} alt={title} className="w-32 md:w-48 h-auto mb-6 opacity-80" />
       <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
       <p className="text-gray-500 text-sm mb-8">
         {description}
       </p>
       {actionLabel && actionLink && (
         <Link to={actionLink}>
           <Button variant="primary" className="bg-red-700 hover:bg-red-800 text-white rounded-full px-8 py-3 font-semibold border-0">
             {actionLabel}
           </Button>
         </Link>
       )}
    </div>
  );
};
