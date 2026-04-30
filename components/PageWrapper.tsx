"use client";
import { useState } from "react";
import SignaturePreloader from "@/components/ui/SignaturePreloader";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* 1. Show Signature Preloader if loading */}
      {isLoading && <SignaturePreloader onComplete={() => setIsLoading(false)} />}

      {/* 2. Only mount children (Hero) AFTER loading is false. 
             This forces the animations to start from scratch. */}
      {!isLoading && (
         <div className="animate-fade-in">
            {children}
         </div>
      )}
    </>
  );
}