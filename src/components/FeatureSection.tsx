
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureSectionProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ icon, title, description }) => {
  return (
    <Card className="text-center hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureSection;
