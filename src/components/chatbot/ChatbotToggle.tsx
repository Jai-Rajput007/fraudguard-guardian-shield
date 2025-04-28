
import { Shield } from "lucide-react";
import { useChatbot } from "@/contexts/ChatbotContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ChatbotToggle = () => {
  const { isOpen, toggleChatbot } = useChatbot();

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        onClick={toggleChatbot}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center ${
          isOpen ? "bg-fraud-danger hover:bg-red-600" : "bg-fraud-success hover:bg-green-600"
        }`}
      >
        {isOpen ? (
          <span className="text-xl font-bold">×</span>
        ) : (
          <Shield className="h-6 w-6" />
        )}
      </Button>
    </motion.div>
  );
};

export default ChatbotToggle;
