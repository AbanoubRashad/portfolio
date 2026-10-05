"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { defaultContent, type Content } from "@/lib/data";

const ContentContext = createContext<Content>(defaultContent);

/** Renders instantly with default content, then swaps in live CMS content from Firestore. */
export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Content>(defaultContent);
  useEffect(() => {
    // Load the Firebase SDK only after the page has rendered, so it stays out of the main bundle.
    import("@/lib/firebase").then((m) => m.loadContent()).then(setContent);
  }, []);
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
