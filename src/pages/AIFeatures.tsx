
import React from 'react';
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Brain, Leaf, MessageSquare, Sparkles } from "lucide-react";
import GreenwashingDetector from "@/components/GreenwashingDetector";
import EcoGuideChat from "@/components/EcoGuideChat";
import AIRecommendations from "@/components/AIRecommendations";
import { sampleProducts } from "@/utils/sampleData";
import WhatsAppDemo from "@/components/WhatsAppDemo";

const AIFeatures = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold flex items-center">
              <Brain className="h-6 w-6 mr-2 text-green-500" />
              AI-Powered Features
            </h1>
          </div>
          <p className="text-xl max-w-3xl">
            Discover our cutting-edge AI tools designed to make sustainable shopping easier, 
            more transparent, and accessible for everyone.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="all">
          <TabsList className="mb-8 w-full justify-start">
            <TabsTrigger value="all">All Features</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="greenwashing">Greenwashing Detector</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-green-500" />
                WhatsApp Integration
              </h2>
              <WhatsAppDemo />
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-green-500" />
                AI-Powered Recommendations
              </h2>
              <AIRecommendations products={sampleProducts} />
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-green-500" />
                Greenwashing Detector
              </h2>
              <GreenwashingDetector />
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-green-500" />
                EcoGuide AI Assistant
              </h2>
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>EcoGuide AI Chat</CardTitle>
                  <CardDescription>
                    Chat with our AI assistant for personalized sustainable shopping guidance.
                    Ask questions about materials, certifications, or specific products.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <p className="mb-4">
                        EcoGuide uses advanced Natural Language Processing to understand your questions and provide
                        evidence-based answers about sustainability. The assistant can help with:
                      </p>
                      <ul className="space-y-2 list-disc list-inside mb-4">
                        <li>Comparing eco-friendliness of different materials</li>
                        <li>Explaining sustainability certifications</li>
                        <li>Finding alternatives to non-sustainable products</li>
                        <li>Providing tips for reducing your carbon footprint</li>
                      </ul>
                      <p>
                        To chat with EcoGuide, simply click the chat icon in the bottom-right corner
                        of any page.
                      </p>
                    </div>
                    <div className="md:w-1/3 flex items-center justify-center">
                      <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-full">
                        <MessageSquare className="h-20 w-20 text-green-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => {
                    const chatToggle = document.querySelector('.fixed.bottom-5.right-5.z-50 button');
                    if (chatToggle) {
                      (chatToggle as HTMLButtonElement).click();
                    }
                  }} className="w-full sm:w-auto">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Open EcoGuide Chat
                  </Button>
                </CardFooter>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="recommendations">
            <AIRecommendations products={sampleProducts} />
          </TabsContent>

          <TabsContent value="greenwashing">
            <GreenwashingDetector />
          </TabsContent>

          <TabsContent value="whatsapp">
            <WhatsAppDemo />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            Our AI features are powered by machine learning models trained on sustainable fashion and product data.
          </p>
        </div>
      </footer>

      <EcoGuideChat />
    </div>
  );
};

export default AIFeatures;
