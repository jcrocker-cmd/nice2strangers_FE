// src/hooks/useNoupeAI.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useNoupeAI = (delay = 1500) => {
  const location = useLocation();

  useEffect(() => {
    // Remove old script if it exists
    const oldScript = document.querySelector('script[src*="noupe.com/embed"]');
    if (oldScript) oldScript.remove();

    // Create new script after a delay (ensures page content is rendered)
    const script = document.createElement("script");
    script.src = "https://www.noupe.com/embed/01981b8d923573d789aa1a8722d9d4e31e6c.js";
    script.async = true;

    const timeout = setTimeout(() => {
      document.body.appendChild(script);
      console.log("Noupe reloaded for route:", location.pathname);
    }, delay);

    return () => clearTimeout(timeout);
  }, [location.pathname, delay]);
};