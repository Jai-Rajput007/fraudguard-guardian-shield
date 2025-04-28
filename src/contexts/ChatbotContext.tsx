
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define message types
type MessageType = 'user' | 'bot';

// Define message structure
interface Message {
  id: string;
  text: string;
  type: MessageType;
  timestamp: Date;
}

// Define QA pairs structure
interface QAPair {
  question: string;
  answer: string;
  keywords: string[];
}

// Define context type
interface ChatbotContextType {
  messages: Message[];
  isOpen: boolean;
  addMessage: (text: string, type: MessageType) => void;
  toggleChatbot: () => void;
  clearMessages: () => void;
}

// Create context
const ChatbotContext = createContext<ChatbotContextType | null>(null);

// Define predefined QA pairs
const qaPairs: QAPair[] = [
  {
    question: "What is transaction type?",
    answer: "It's the type of transaction, like PAYMENT for purchases or TRANSFER for money transfers.",
    keywords: ["transaction type", "type", "payment", "transfer"]
  },
  {
    question: "What is transaction frequency?",
    answer: "The number of transactions by the same originator in the last hour.",
    keywords: ["transaction frequency", "frequency", "how many", "transactions per hour"]
  },
  {
    question: "How do I find account balances?",
    answer: "Check the bank system for balances before and after the transaction.",
    keywords: ["account balance", "balance", "find balance"]
  },
  {
    question: "What does merchant destination mean?",
    answer: "Check if the recipient is a merchant account, often indicated by a specific ID.",
    keywords: ["merchant", "destination", "merchant destination", "recipient"]
  },
  {
    question: "How does the fraud detection work?",
    answer: "Our system uses a machine learning model trained on the PaySim dataset to analyze transaction patterns and identify potential fraud.",
    keywords: ["fraud detection", "how works", "detection", "algorithm"]
  },
  {
    question: "What's the PaySim dataset?",
    answer: "PaySim is a synthetic dataset that simulates mobile money transactions, containing 6.3 million transactions with features like amount, type, and account balances.",
    keywords: ["paysim", "dataset", "data"]
  },
  {
    question: "What should I do if I detect fraud?",
    answer: "If our system flags a transaction as potentially fraudulent, follow your organization's fraud response protocol, which typically involves contacting the account holder and potentially freezing the account.",
    keywords: ["detect fraud", "what to do", "protocol", "procedure"]
  },
  {
    question: "Can I export the results?",
    answer: "Yes, after getting a prediction, you can download the results as a CSV file using the export button.",
    keywords: ["export", "download", "save", "csv"]
  }
];

// Find the best match from QA pairs for a user query
const findBestMatch = (query: string): string => {
  // Convert query to lowercase for case-insensitive matching
  const lowercaseQuery = query.toLowerCase();
  
  // Try to find an exact match first
  for (const pair of qaPairs) {
    if (lowercaseQuery === pair.question.toLowerCase()) {
      return pair.answer;
    }
  }
  
  // If no exact match, look for keyword matches
  const matchingPairs = qaPairs.filter(pair => {
    return pair.keywords.some(keyword => lowercaseQuery.includes(keyword.toLowerCase()));
  });
  
  if (matchingPairs.length > 0) {
    // Return the answer from the first matching pair
    return matchingPairs[0].answer;
  }
  
  // If no match, return a default message
  return "Sorry, I don't understand. Try asking about transaction types, balances, or how to detect fraud.";
};

// Provider component
export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize with a welcome message
  useEffect(() => {
    addMessage(
      "Hello! I'm FraudGuard Assistant. How can I help you today?",
      'bot'
    );
  }, []);

  // Add a message to the chat
  const addMessage = (text: string, type: MessageType) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // If it's a user message, generate a bot response
    if (type === 'user') {
      setTimeout(() => {
        const botResponse = findBestMatch(text);
        addMessage(botResponse, 'bot');
      }, 500); // Add a small delay for natural feel
    }
  };

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(prevState => !prevState);
  };

  // Clear all messages except the welcome message
  const clearMessages = () => {
    setMessages([]);
    // Re-add the welcome message
    addMessage(
      "Hello! I'm FraudGuard Assistant. How can I help you today?",
      'bot'
    );
  };

  return (
    <ChatbotContext.Provider value={{ messages, isOpen, addMessage, toggleChatbot, clearMessages }}>
      {children}
    </ChatbotContext.Provider>
  );
};

// Custom hook to use the chatbot context
export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
