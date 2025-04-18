
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Check, Info, ShieldAlert, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

interface GreenwashingResult {
  score: number; // 0-100
  verdict: 'Likely Genuine' | 'Potentially Misleading' | 'Highly Suspicious';
  issues: string[];
  improvements: string[];
}

const GreenwashingDetector: React.FC = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<GreenwashingResult | null>(null);
  const { toast } = useToast();

  // This is a placeholder for actual ML/NLP analysis that would happen in a real app
  const analyzeText = () => {
    if (!text.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter a product description to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate processing time
    setTimeout(() => {
      // Detect common greenwashing phrases
      const greenwashingPhrases = [
        'eco-friendly', 'green', 'natural', 'sustainable', 'environmentally friendly',
        'biodegradable', 'recyclable', 'non-toxic'
      ];
      
      const specificClaimsRegex = /(certified|verified|tested|proven|guaranteed|measured|reduced by \d+%|third-party)/gi;
      
      // Simple algorithm to detect potential greenwashing
      const lowerCaseText = text.toLowerCase();
      let greenwashingScore = 0;
      let issues: string[] = [];
      let improvements: string[] = [];
      
      // Check for vague terms without specific claims
      greenwashingPhrases.forEach(phrase => {
        if (lowerCaseText.includes(phrase.toLowerCase()) && !specificClaimsRegex.test(text)) {
          greenwashingScore += 15;
          issues.push(`Uses vague term "${phrase}" without specific certifications or evidence`);
          improvements.push(`Provide specific certifications or measurable details for "${phrase}" claim`);
        }
      });
      
      // Check for specific environmental claims
      if (!/certification|certified by|verified by|tested by/i.test(text) && 
          /eco-friendly|sustainable|green|environmentally friendly/i.test(text)) {
        greenwashingScore += 25;
        issues.push("Makes environmental claims without mentioning certifications");
        improvements.push("Add relevant eco-certifications (e.g., GOTS, Fair Trade, Energy Star)");
      }
      
      // Check for specific metrics
      if (!/\d+%|carbon|footprint|emissions|water usage|energy consumption/i.test(text) && 
          /reduces|reduces impact|less waste|eco-friendly|sustainable/i.test(text)) {
        greenwashingScore += 20;
        issues.push("Claims reductions without specific metrics");
        improvements.push("Add specific metrics (e.g., \"reduces water usage by 40%\")");
      }
      
      // Cap at 100
      greenwashingScore = Math.min(100, greenwashingScore);
      
      // Default fallbacks if no issues detected
      if (issues.length === 0) {
        issues.push("No obvious greenwashing detected");
      }
      if (improvements.length === 0) {
        improvements.push("Continue providing specific, verifiable claims");
      }
      
      let verdict: 'Likely Genuine' | 'Potentially Misleading' | 'Highly Suspicious';
      
      if (greenwashingScore < 30) {
        verdict = 'Likely Genuine';
      } else if (greenwashingScore < 70) {
        verdict = 'Potentially Misleading';
      } else {
        verdict = 'Highly Suspicious';
      }
      
      setResult({
        score: greenwashingScore,
        verdict,
        issues,
        improvements
      });
      
      setIsAnalyzing(false);
    }, 1500);
  };

  const resetAnalysis = () => {
    setResult(null);
    setText('');
  };

  const getVerdictColor = () => {
    if (!result) return '';
    if (result.score < 30) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (result.score < 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  const getVerdictIcon = () => {
    if (!result) return null;
    if (result.score < 30) return <ShieldCheck className="h-5 w-5 text-green-500" />;
    if (result.score < 70) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <ShieldAlert className="h-5 w-5 text-red-500" />;
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
          Greenwashing Detector
        </CardTitle>
        <CardDescription>Analyze product descriptions for misleading environmental claims</CardDescription>
      </CardHeader>
      <CardContent>
        {!result ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter a product description or environmental claim to check for potential greenwashing language.
            </p>
            <Textarea
              placeholder="This 100% eco-friendly product is made from natural materials that are good for the environment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-md ${getVerdictColor()}`}>
              <div className="flex items-center">
                {getVerdictIcon()}
                <h3 className="ml-2 font-medium text-lg">{result.verdict}</h3>
              </div>
              <div className="mt-2">
                <p className="text-sm">Greenwashing Score: {result.score}/100</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 dark:bg-gray-700">
                  <div 
                    className={`h-2.5 rounded-full ${
                      result.score < 30 ? 'bg-green-500' : result.score < 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>
            </div>
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Potential Issues</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {result.issues.map((issue, index) => (
                    <li key={index} className="text-sm">{issue}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
            
            <Alert variant="default">
              <Check className="h-4 w-4" />
              <AlertTitle>Suggested Improvements</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {result.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm">{improvement}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 pt-2">
        {!result ? (
          <Button 
            onClick={analyzeText} 
            disabled={isAnalyzing || !text.trim()}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze Text'
            )}
          </Button>
        ) : (
          <Button 
            onClick={resetAnalysis} 
            variant="outline"
          >
            Analyze Another
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default GreenwashingDetector;
