import { useState, useCallback } from "react";
import { postJson } from "./api";

export interface Message {
    role: "user" | "assistant"; // Fixed: removed leading space from " assistant"
    content: string;
}



export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [streaming, setStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = useCallback(async (userText: string) => { // Fixed typo: senfMessage -> sendMessage
        const userMessage: Message = { role: "user", content: userText };
        const updatedMessages = [...messages, userMessage];
        
        setMessages(updatedMessages);
        setStreaming(true);
        setError(null);

        // Add the empty placeholder for the assistant stream to chunk into
        setMessages((previous) => [...previous, { role: "assistant", content: "" }]);

        try {
            const res = await postJson('/api/chat', { messages: updatedMessages });
      
            if (!res.ok) throw new Error("Chat request failed");
      
            const reader = res.body!.getReader();
            const decoder = new TextDecoder();
      
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
        
                const chunk = decoder.decode(value, { stream: true });
        
                // Append each streamed chunk to the last assistant message
                setMessages((prev) => {
                    const updated = [...prev];
                    if (updated.length > 0) {
                        updated[updated.length - 1] = {
                            role: "assistant",
                            content: updated[updated.length - 1].content + chunk,
                        };
                    }
                    return updated;
                });
            }
        } catch {
            setError("Something went wrong. Please try again.");
            // Remove the empty assistant placeholder on failure
            setMessages((prev) => prev.slice(0, -1));
        } finally {
            setStreaming(false);
        }
    }, [messages]);
        
    const clearMessages = useCallback(() => setMessages([]), []);
    
    // Explicitly return sendMessage to match destruction keys in your UI component
    return { messages, streaming, error, sendMessage, clearMessages };
};