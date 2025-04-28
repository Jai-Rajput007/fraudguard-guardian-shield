
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext';

const ChatbotPage = () => {
  const { messages, addMessage, clearMessages } = useChatbot();
  const [userInput, setUserInput] = useState('');
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom on new messages
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
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-fraud-blue mb-4">
          FraudGuard Assistant
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get answers about fraud detection, transaction details, or how to use our platform.
        </p>
      </motion.section>
      
      {/* Chatbot Interface */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Chat Header */}
          <div className="bg-fraud-blue text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-semibold">FraudGuard Assistant</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearMessages}
              className="text-white hover:bg-blue-700"
            >
              Clear Chat
            </Button>
          </div>
          
          {/* Messages Container */}
          <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                initial={message.type === 'user' ? { x: 20, opacity: 0 } : { x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`p-4 rounded-lg max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-fraud-blue text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs mt-2 block opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
            <div ref={messageEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question here..."
                className="flex-1"
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
        
        {/* Suggestion Chips */}
        <motion.div
          className="mt-8 flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="w-full text-center mb-2 text-gray-600">Try asking about:</p>
          
          {[
            "What is transaction type?",
            "How do I find account balances?",
            "What does merchant destination mean?",
            "How does the fraud detection work?"
          ].map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              className="text-fraud-blue border-fraud-blue hover:bg-fraud-blue/5"
              onClick={() => {
                addMessage(suggestion, 'user');
              }}
            >
              {suggestion}
            </Button>
          ))}
        </motion.div>
        
        {/* FAQ Section */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-fraud-blue mb-6 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="glass rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">What types of fraud can the system detect?</h3>
                <p className="text-gray-600">
                  Our system is trained to detect various types of credit card fraud including unusual transaction patterns, suspicious amounts, and inconsistent account behaviors.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">How accurate is the fraud detection?</h3>
                <p className="text-gray-600">
                  Our model achieves an F1-score above 0.90 on test data, providing high accuracy even with the highly imbalanced nature of fraud data where only 0.13% of transactions are fraudulent.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold mb-2">What should I do if a transaction is flagged as fraud?</h3>
                <p className="text-gray-600">
                  If a transaction is flagged as potentially fraudulent, follow your organization's fraud response protocol. This typically involves contacting the account holder and potentially freezing the account while investigating.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I export the prediction results?</h3>
                <p className="text-gray-600">
                  Yes, after receiving a fraud prediction, you can download the results as a CSV file using the export button in the results section.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Support Section */}
        <motion.section
          className="mt-16 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-fraud-blue mb-6 text-center">
            Additional Support
          </h2>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Need more help? Contact our support team for assistance with the FraudGuard platform.
            </p>
            
            <a 
              href="mailto:support@fraudguard.com" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-fraud-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Contact Support
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ChatbotPage;
