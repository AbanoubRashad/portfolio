"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { defaultContent, type Content } from "@/lib/data";
import { loadContent } from "@/lib/firebase";

const ContentContext = createContext<Content>(defaultContent);

/** Renders instantly with default content, then swaps in live CMS content from Firestore. */
export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Content>(defaultContent);
  useEffect(() => {
    loadContent().then(setContent);
  }, []);
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
