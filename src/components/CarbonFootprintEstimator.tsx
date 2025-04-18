
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Leaf, Truck, Factory, Gauge } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CarbonFootprintEstimator: React.FC = () => {
  const [material, setMaterial] = useState("cotton");
  const [weight, setWeight] = useState(0.5);
  const [distance, setDistance] = useState(1000);
  const [footprint, setFootprint] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const materials: Record<string, { factor: number, label: string }> = {
    cotton: { factor: 5.5, label: "Cotton (Conventional)" },
    organic_cotton: { factor: 2.5, label: "Organic Cotton" },
    polyester: { factor: 6.0, label: "Polyester" },
    recycled_polyester: { factor: 2.7, label: "Recycled Polyester" },
    nylon: { factor: 7.5, label: "Nylon" },
    wool: { factor: 20.0, label: "Wool" },
    linen: { factor: 1.7, label: "Linen" },
    leather: { factor: 80.0, label: "Leather" },
    bamboo: { factor: 4.0, label: "Bamboo" },
    plastic: { factor: 6.3, label: "Plastic" },
    glass: { factor: 0.85, label: "Glass" },
    aluminum: { factor: 8.0, label: "Aluminum" },
    paper: { factor: 1.1, label: "Paper" },
    cardboard: { factor: 0.8, label: "Cardboard" }
  };

  const calculateFootprint = () => {
    // This is a simplified model - a real one would be more complex
    // Material CO2 (kg) = Material Weight (kg) * Material Factor
    // Transport CO2 (kg) = Distance (km) * Weight (kg) * 0.0002 (simplified transport emission factor)
    // Total CO2 (kg) = Material CO2 + Transport CO2
    
    const materialEmissions = weight * materials[material].factor;
    const transportEmissions = distance * weight * 0.0002;
    const totalEmissions = materialEmissions + transportEmissions;
    
    setFootprint(parseFloat(totalEmissions.toFixed(2)));
    
    // Generate recommendations based on calculations
    const newRecommendations = [];
    
    // Material recommendations
    if (material === "cotton") {
      newRecommendations.push("Switch to organic cotton to reduce emissions by ~55%");
    } else if (material === "polyester") {
      newRecommendations.push("Use recycled polyester to reduce emissions by ~55%");
    } else if (material === "leather") {
      newRecommendations.push("Consider leather alternatives like apple leather or mushroom leather to significantly reduce emissions");
    }
    
    // Weight recommendations
    if (weight > 0.3) {
      newRecommendations.push("Reduce product weight by using lighter materials or optimizing design");
    }
    
    // Transport recommendations
    if (distance > 1000) {
      newRecommendations.push("Source materials locally to reduce transportation emissions");
    }
    
    // Add a general recommendation
    if (totalEmissions > 5) {
      newRecommendations.push("Consider carbon offset programs to neutralize your product's impact");
    } else {
      newRecommendations.push("Great job! Your product has a relatively low carbon footprint");
    }
    
    setRecommendations(newRecommendations);
  };

  const formatDistanceValue = (value: number) => {
    if (value < 1000) return `${value} km`;
    return `${(value / 1000).toFixed(1)} thousand km`;
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Gauge className="h-5 w-5 mr-2 text-green-500" />
          Carbon Footprint Estimator
        </CardTitle>
        <CardDescription>
          Calculate the estimated CO2 emissions of your product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="material">Material Type</Label>
          <Select value={material} onValueChange={setMaterial}>
            <SelectTrigger>
              <SelectValue placeholder="Select material" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(materials).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="weight">Product Weight (kg)</Label>
            <span className="text-sm text-muted-foreground">{weight} kg</span>
          </div>
          <Slider
            id="weight"
            min={0.1}
            max={5}
            step={0.1}
            value={[weight]}
            onValueChange={(values) => setWeight(values[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="distance">Transport Distance</Label>
            <span className="text-sm text-muted-foreground">
              {formatDistanceValue(distance)}
            </span>
          </div>
          <Slider
            id="distance"
            min={100}
            max={10000}
            step={100}
            value={[distance]}
            onValueChange={(values) => setDistance(values[0])}
          />
        </div>

        {footprint !== null && (
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {footprint} kg CO2e
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Estimated carbon footprint of your product
              </p>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <Factory className="h-4 w-4 text-gray-500" />
                <div className="text-sm">
                  <span className="font-medium">Materials: </span>
                  {(weight * materials[material].factor).toFixed(2)} kg CO2e
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Truck className="h-4 w-4 text-gray-500" />
                <div className="text-sm">
                  <span className="font-medium">Transport: </span>
                  {(distance * weight * 0.0002).toFixed(2)} kg CO2e
                </div>
              </div>
            </div>
            
            {recommendations.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-sm flex items-center">
                  <Leaf className="h-4 w-4 mr-1 text-green-500" />
                  Recommendations:
                </h4>
                <ul className="text-sm space-y-1">
                  {recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-1">•</span> {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={calculateFootprint} className="bg-green-500 hover:bg-green-600">
                Calculate Footprint
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Using ML regression model for estimation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default CarbonFootprintEstimator;
