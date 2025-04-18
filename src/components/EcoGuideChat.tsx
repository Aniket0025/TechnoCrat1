
import React, { useState, useRef, useEffect } from 'react';
import { products, Product } from "@/data/products";
import { getOrders, Order } from "@/services/orderStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Send, User, X, MinimizeIcon, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const EcoGuideChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I\'m EcoGuide, your sustainable shopping assistant. Ask me anything about eco-friendly products, finding shops, your orders, or return policies!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Import product/order data statically for demo (replace with hooks/services for live data)
  const orders: Order[] = getOrders();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  function detectIntent(msg: string): { type: "order_status" | "return_policy" | "product_search" | "general"; payload?: string } {
    const lower = msg.toLowerCase();
    if (lower.includes("order status") || lower.includes("where's my order") || lower.includes("track order")) {
      return { type: "order_status" };
    }
    if (lower.includes("return") || lower.includes("refund")) {
      return { type: "return_policy" };
    }
    // Only treat as product search if the user is clearly searching for a product
    if ((/\b(find|show|search|buy|get|list)\b/.test(lower)) &&
        (/(eco|green|organic|bamboo|recycled|shoes|t-shirt|bottle|bag|coffee|toothbrush|product|item|shop|store)/.test(lower))) {
      return { type: "product_search", payload: lower };
    }
    return { type: "general" };
  }

  function handleProductSearch(query: string) {
    // Try to find products matching query
    const found = products.filter((p: Product) => query.includes(p.name.toLowerCase()) || query.split(" ").some((w: string) => p.name.toLowerCase().includes(w)));
    if (found.length > 0) {
      return `Here are some products matching your search:\n${found.map((p: Product) => `• ${p.name} (₹${p.price})`).join("\n")}`;
    }
    // Try to find by eco terms
    const ecoFound = products.filter((p: Product) => query.split(" ").some((w: string) => p.materials?.join(" ").toLowerCase().includes(w)));
    if (ecoFound.length > 0) {
      return `Eco-friendly options:\n${ecoFound.map((p: Product) => `• ${p.name} (₹${p.price})`).join("\n")}`;
    }
    return "Sorry, I couldn't find any products matching your search.";
  }

  function handleOrderStatus() {
    if (!orders.length) return "I couldn't find any recent orders for you. Please make sure you're logged in.";
    const last = orders[orders.length - 1];
    return `Your last order (${last.id}) for ₹${last.total} was placed on ${last.date}. Items: ${last.items.map((i) => i.product.name + ' x' + i.quantity).join(", ")}.`;
  }

  function handleReturnPolicy() {
    return "Our return policy: You can return any unused product within 30 days for a full refund. For more details or to start a return, visit your order history page.";
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage = { role: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    try {
      const intent = detectIntent(inputMessage);
      let aiText = "";
      if (intent.type === "product_search") {
        aiText = handleProductSearch(inputMessage);
      } else if (intent.type === "order_status") {
        aiText = handleOrderStatus();
      } else if (intent.type === "return_policy") {
        aiText = handleReturnPolicy();
      } else {
        aiText = await import("@/services/gemini").then(m => m.askGemini(inputMessage));
      }
      const aiResponse = { role: 'assistant' as const, content: aiText };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Couldn't get a response",
        description: "Please try again later.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-5 right-5 z-50">
        {!isOpen && (
          <Button 
            onClick={toggleChat} 
            size="lg" 
            className="rounded-full p-4 shadow-lg bg-green-500 hover:bg-green-600"
          >
            <Bot className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-5 right-5 w-80 md:w-96 shadow-xl z-50 border-green-200 dark:border-green-800">
          <CardHeader className="bg-green-500 text-white py-3 flex flex-row items-center justify-between">
  <div className="flex items-center">
    <Bot className="h-5 w-5 mr-2 animate-bounce" />
    <CardTitle className="text-base font-medium">EcoGuide Assistant</CardTitle>
  </div>
  <Button variant="ghost" size="icon" aria-label="Close Chat" onClick={toggleChat}>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </Button>
</CardHeader>
          <CardContent className="h-80 overflow-y-auto space-y-4 bg-gradient-to-br from-green-50 to-blue-50 py-3 px-2 rounded">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-md whitespace-pre-line text-base font-medium transition-all duration-200 border-2 ${msg.role === 'assistant' ? 'bg-green-100 text-green-900 border-green-300' : 'bg-white text-gray-900 border-gray-200'} flex items-start gap-2`}>
                  {msg.role === 'assistant' ? <Bot className="w-5 h-5 mt-0.5 text-green-600 shrink-0" /> : <User className="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />}
                  <span className="leading-relaxed">
                    {msg.role === 'assistant' ? (
                      <span>
                        <span className="font-bold text-green-800">EcoGuide:</span><br />{msg.content}
                      </span>
                    ) : (
                      msg.content
                    )}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="flex gap-2 pt-2">
            <Textarea
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
              placeholder="Ask about eco products, orders, shops..."
              className="flex-1 resize-none bg-gray-100 text-gray-900 placeholder-gray-600 focus:bg-white focus:border-green-500 border-green-200 rounded shadow-sm font-medium"
              style={{ color: '#222', background: '#f8f9fa', fontWeight: 500 }}
              rows={2}
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow flex items-center gap-1">
              <Send className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default EcoGuideChat;
