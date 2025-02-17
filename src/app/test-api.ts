// Test language detection
if (typeof window !== "undefined" && "ai" in window) {
  (window as any).ai
    .detectLanguage("Hello world")
    .then((result: { languageCode: string }) => {
      console.log("Detected language:", result.languageCode);
    });
} else {
  console.error("Chrome AI APIs not available!");
}
