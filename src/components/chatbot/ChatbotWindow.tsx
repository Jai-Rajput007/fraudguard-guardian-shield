
import { useState, useRef, useEffect } from 'react';
import { useChatbot } from '@/contexts/ChatbotContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';

const ChatbotWindow = () => {
  const { messages, isOpen, addMessage, clearMessages } = useChatbot();
  const [userInput, setUserInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to most recent message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      addMessage(userInput.trim(), 'user');
      setUserInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-20 right-5 w-full sm:w-96 h-[500px] max-h-[80vh] glass rounded-lg shadow-lg z-40 overflow-hidden flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Chat Header */}
        <div className="bg-fraud-blue text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            <h3 className="font-medium">FraudGuard Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearMessages}
            className="h-8 text-xs text-white hover:bg-blue-700"
          >
            Clear Chat
          </Button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
              initial={message.type === 'user' ? { x: 20, opacity: 0 } : { x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.type === 'user'
                    ? 'bg-fraud-blue text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs mt-1 block opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t bg-white">
          <div className="flex">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question here..."
              className="flex-1 focus-visible:ring-fraud-blue"
            />
            <Button 
              onClick={handleSendMessage}
              className="ml-2 bg-fraud-blue hover:bg-blue-700"
            >
              Send
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatbotWindow;
