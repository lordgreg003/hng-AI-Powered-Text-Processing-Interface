// Test language detection
if (typeof window !== "undefined" && "ai" in window) {
  (
    window as Window & {
      ai: {
        detectLanguage: (text: string) => Promise<{ languageCode: string }>;
      };
    }
  ).ai
    .detectLanguage("Hello world")
    .then((result: { languageCode: string }) => {
      console.log("Detected language:", result.languageCode);
    });
} else {
  console.error("Chrome AI APIs not available!");
}
