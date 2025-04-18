
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HomeIcon, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 p-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-green-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Oops! The sustainable product you're looking for doesn't exist.
        </p>
        <Button asChild className="mr-4">
          <Link to="/">
            <HomeIcon className="mr-2 h-4 w-4" /> Go Home
          </Link>
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
