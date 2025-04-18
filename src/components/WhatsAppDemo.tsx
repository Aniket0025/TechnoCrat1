
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Image, Send, ShoppingBag, Sparkles, MessageSquare, Check, AlertTriangle, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/ProductCard";
import { sampleProducts, sampleAlternatives } from "@/utils/sampleData";

const WhatsAppDemo: React.FC = () => {
  const [chatTab, setChatTab] = useState<string>("conversation");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string | React.ReactNode}>>([
    {
      type: 'bot',
      content: 'Hello! I\'m your EcoGuide on WhatsApp. You can ask me about sustainable products or send a photo/link to any product to get its eco-score and alternatives!'
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      content: message
    }]);
    
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let botResponse;
      
      if (message.toLowerCase().includes('h&m') || message.toLowerCase().includes('dress')) {
        botResponse = {
          type: 'bot',
          content: (
            <div className="space-y-3">
              <p>Based on my analysis, this H&M dress has an eco-score of 4/10. It's made with conventional cotton which uses high amounts of water and pesticides.</p>
              
              <div className="flex items-center space-x-1 my-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <p className="text-amber-500 font-medium">Potential greenwashing detected in product description.</p>
              </div>
              
              <p className="text-sm text-muted-foreground">Terms like "conscious collection" are used without specific certifications.</p>
              
              <div className="mt-3">
                <p className="font-medium">Here are 3 more sustainable alternatives:</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>Reformation Cecil Dress (Eco-Score: 8/10)</li>
                  <li>Kotn Cotton Maxi Dress (Eco-Score: 7/10)</li>
                  <li>Patagonia Hemp Wrap Dress (Eco-Score: 9/10)</li>
                </ul>
              </div>
            </div>
          )
        };
      } else if (message.toLowerCase().includes('vegan') && message.toLowerCase().includes('leather') && message.toLowerCase().includes('bag')) {
        botResponse = {
          type: 'bot',
          content: (
            <div className="space-y-3">
              <p>Here are some vegan leather bags under $50 with good eco-scores:</p>
              
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Matt & Nat Vegan Crossbody - $49 (Eco-Score: 7/10)</li>
                <li>Pixie Mood Recycled Shoulder Bag - $45 (Eco-Score: 8/10)</li>
                <li>Corkor Cork Mini-Tote - $39 (Eco-Score: 9/10)</li>
              </ul>
              
              <div className="flex items-center space-x-1 mt-3">
                <Leaf className="h-4 w-4 text-green-500" />
                <p className="text-sm text-green-600">Note that some vegan leather alternatives use plastic (PVC/PU). Cork, apple leather, and cactus leather are more sustainable options.</p>
              </div>
            </div>
          )
        };
      } else {
        botResponse = {
          type: 'bot',
          content: "I'd be happy to help you with sustainable shopping information! You can ask me about specific products, materials, or brands - or send a photo of a product for instant analysis."
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
      setMessage("");
    }, 1500);
  };

  const handleImageScan = () => {
    setScanning(true);
    
    // Add user action message
    setMessages(prev => [...prev, {
      type: 'user',
      content: <span className="italic text-muted-foreground">[Sent a photo of a product]</span>
    }]);
    
    // Simulate image processing
    setTimeout(() => {
      setScanning(false);
      setShowResult(true);
      
      // Add bot response with product analysis
      setMessages(prev => [...prev, {
        type: 'bot',
        content: (
          <div className="space-y-3">
            <p>I've analyzed the product image you sent:</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
              <h4 className="font-medium">Product Detection:</h4>
              <p>Cotton T-Shirt by Fast Fashion Brand</p>
              
              <div className="flex items-center mt-2 mb-1">
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{width: '40%'}}></div>
                </div>
                <span className="ml-2 font-bold">4/10</span>
              </div>
              
              <div className="text-sm mt-2">
                <span className="font-medium">Issues detected:</span>
                <ul className="list-disc list-inside mt-1">
                  <li>Conventional cotton (high water usage)</li>
                  <li>Fast fashion supply chain</li>
                  <li>No certifications found</li>
                </ul>
              </div>
            </div>
            
            <p>Here are 3 eco-friendly alternatives I found:</p>
          </div>
        )
      }]);
    }, 3000);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Smartphone className="h-5 w-5 text-green-500 mr-2" />
            <CardTitle>WhatsApp Integration</CardTitle>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            <Sparkles className="h-3 w-3 mr-1" />
            Beta Feature
          </Badge>
        </div>
        <CardDescription>
          Get sustainable shopping insights directly on WhatsApp. Scan products, chat with our AI, and find eco-friendly alternatives on-the-go.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                How It Works
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Send a <strong>photo</strong> or <strong>link</strong> of any product to our WhatsApp number</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Our <strong>AI analyzes</strong> the product's environmental impact and detects greenwashing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Get an <strong>eco-score</strong> and <strong>sustainable alternatives</strong> in seconds</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Ask questions about <strong>sustainability practices</strong> and get expert answers</span>
                </li>
              </ul>
            </div>
            
            {showResult && (
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold">Suggested Alternatives:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {sampleAlternatives.slice(0, 3).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSave={() => {
                        toast({
                          title: "Product Saved",
                          description: `${product.name} has been added to your favorites.`,
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="md:w-80 bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="bg-green-500 text-white p-3 flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              <span className="font-semibold">EcoCart on WhatsApp</span>
            </div>
            
            <Tabs value={chatTab} onValueChange={setChatTab} className="flex-1 flex flex-col">
              <div className="px-3 pt-3">
                <TabsList className="w-full">
                  <TabsTrigger value="conversation" className="flex-1">Chat Demo</TabsTrigger>
                  <TabsTrigger value="scan" className="flex-1">Scan Demo</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="conversation" className="flex-1 flex flex-col p-0 m-0">
                <div className="flex-1 p-3 overflow-y-auto max-h-[350px]">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex mb-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`rounded-lg py-2 px-3 max-w-[85%] ${
                        msg.type === 'user' 
                          ? 'bg-green-500 text-white rounded-br-none' 
                          : 'bg-white dark:bg-gray-700 rounded-bl-none border border-gray-200 dark:border-gray-600'
                      }`}>
                        {typeof msg.content === 'string' ? <p className="text-sm">{msg.content}</p> : msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex mb-3 justify-start">
                      <div className="rounded-lg py-2 px-3 bg-white dark:bg-gray-700 rounded-bl-none border border-gray-200 dark:border-gray-600">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 mt-auto">
                  <div className="flex space-x-2">
                    <Textarea 
                      placeholder="Ask about sustainable products..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      size="icon" 
                      onClick={handleSendMessage}
                      disabled={isLoading || !message.trim()}
                      className="bg-green-500 hover:bg-green-600 flex-shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                    Try: "Is this H&M dress eco-friendly?" or "Show me vegan leather bags under $50"
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="scan" className="flex-1 flex flex-col p-0 m-0">
                <div className="flex-1 p-4 flex flex-col items-center justify-center space-y-4">
                  {scanning ? (
                    <>
                      <div className="w-48 h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-2 bg-green-500/20 animate-pulse"></div>
                        </div>
                        <Image className="h-16 w-16 text-gray-400" />
                      </div>
                      <p className="text-center animate-pulse">Scanning product image...</p>
                    </>
                  ) : (
                    <>
                      <div 
                        className="w-48 h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                        onClick={handleImageScan}
                      >
                        <div className="text-center">
                          <Image className="h-16 w-16 mx-auto text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Click to simulate sending a product photo
                          </p>
                        </div>
                      </div>
                      <Button onClick={handleImageScan} className="bg-green-500 hover:bg-green-600">
                        <Image className="h-4 w-4 mr-2" />
                        Scan Product Image
                      </Button>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            Preview of our WhatsApp integration powered by Twilio and OpenAI GPT-4.
          </p>
          <Button variant="outline" className="sm:ml-auto">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Try the WhatsApp Demo
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WhatsAppDemo;
