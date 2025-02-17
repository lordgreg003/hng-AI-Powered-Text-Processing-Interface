"use client";
import { useState } from "react";
import { mockAI } from "@/utils/mock-ai";

type Message = {
  text: string;
  detectedLang?: string;
  summary?: string;
  translation?: string;
};

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [targetLang, setTargetLang] = useState("en");
  const [isDetecting, setIsDetecting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Use real APIs if available, else mocks
  const ai = typeof window !== "undefined" && window.ai ? window.ai : mockAI;

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = { text: inputText };
    setMessages([...messages, newMessage]);

    setIsDetecting(true);
    try {
      const detection = await ai.detectLanguage(inputText);
      newMessage.detectedLang = detection.languageCode;
      setMessages((prev) => [...prev.slice(0, -1), newMessage]);
    } catch (error) {
      alert("Language detection failed. Please try again.");
      console.log(error);
      
    } finally {
      setIsDetecting(false);
      setInputText("");
    }
  };

  const handleSummarize = async (messageIndex: number) => {
    setIsSummarizing(true);
    try {
      const textToSummarize = messages[messageIndex].text;
      const summaryResult = await ai.summarize(textToSummarize);
      const updatedMessages = [...messages];
      updatedMessages[messageIndex].summary = summaryResult.summary;
      setMessages(updatedMessages);
    } catch (error) {
      alert("Summarization failed. Please try again.");
      console.log(error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleTranslate = async (messageIndex: number) => {
    setIsTranslating(true);
    try {
      const textToTranslate = messages[messageIndex].text;
      const translationResult = await ai.translate(textToTranslate, {
        targetLang: targetLang,
      });
      const updatedMessages = [...messages];
      updatedMessages[messageIndex].translation = translationResult.translation;
      setMessages(updatedMessages);
    } catch (error) {
      alert("Translation failed. Please try again.");
      console.log(error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="container">
      {/* Messages display */}
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <p>{msg.text}</p>

            {msg.detectedLang && (
              <small>Detected language: {msg.detectedLang}</small>
            )}

            <div className="action-buttons">
              {msg.detectedLang === "en" && msg.text.length > 150 && (
                <button
                  onClick={() => handleSummarize(index)}
                  disabled={isSummarizing}
                >
                  {isSummarizing ? "Summarizing..." : "Summarize"}
                </button>
              )}

              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="tr">Turkish</option>
                <option value="fr">French</option>
              </select>

              <button
                onClick={() => handleTranslate(index)}
                disabled={isTranslating}
              >
                {isTranslating ? "Translating..." : "Translate"}
              </button>
            </div>

            {msg.summary && <div className="summary">{msg.summary}</div>}
            {msg.translation && (
              <div className="translation">{msg.translation}</div>
            )}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="input-area">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text..."
          disabled={isDetecting}
        />
        <button onClick={handleSend} disabled={isDetecting}>
          {isDetecting ? "Detecting Language..." : "Send"}
        </button>
      </div>
    </div>
  );
}