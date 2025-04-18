
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Leaf, Recycle, Award, Flame, Shield } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EcoBadgeProps {
  type: string;
}

const EcoBadge: React.FC<EcoBadgeProps> = ({ type }) => {
  let icon;
  let color;
  let tooltip;
  
  switch(type) {
    case 'Recycled':
      icon = <Recycle className="h-3 w-3 mr-1" />;
      color = "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800";
      tooltip = "Made from at least 50% recycled materials";
      break;
    case 'Organic':
      icon = <Leaf className="h-3 w-3 mr-1" />;
      color = "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800";
      tooltip = "Produced without synthetic fertilizers or pesticides";
      break;
    case 'Fair Trade':
      icon = <Award className="h-3 w-3 mr-1" />;
      color = "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800";
      tooltip = "Producers received fair compensation and working conditions";
      break;
    case 'Carbon Neutral':
      icon = <Flame className="h-3 w-3 mr-1" />;
      color = "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800";
      tooltip = "Carbon emissions from production have been offset";
      break;
    default:
      icon = <Shield className="h-3 w-3 mr-1" />;
      color = "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
      tooltip = "Eco-friendly product";
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`flex items-center text-xs px-2 py-1 ${color}`}>
            {icon}
            {type}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EcoBadge;
