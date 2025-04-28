
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Chatbot from '@/components/chatbot/Chatbot';
import { ArrowRight } from 'lucide-react';

// Define transaction form types
interface TransactionFormData {
  transTime: string;
  amount: string;
  type: string;
  oldBalanceOrg: string;
  newBalanceOrig: string;
  oldBalanceDest: string;
  newBalanceDest: string;
  transFrequency: string;
  isMerchantDest: boolean;
}

// Define prediction result types
interface PredictionResult {
  prediction: 'Fraud' | 'Non-Fraud';
  fraudProbability: number;
}

const HomePage = () => {
  // Initialize form data state
  const [formData, setFormData] = useState<TransactionFormData>({
    transTime: new Date().toISOString().slice(0, 16),
    amount: '',
    type: '',
    oldBalanceOrg: '',
    newBalanceOrig: '',
    oldBalanceDest: '',
    newBalanceDest: '',
    transFrequency: '0',
    isMerchantDest: false,
  });

  // State for tracking form submission and results
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle select changes
  const handleSelectChange = (value: string, name: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, isMerchantDest: checked });
  };

  // Reset form to initial state
  const handleReset = () => {
    setFormData({
      transTime: new Date().toISOString().slice(0, 16),
      amount: '',
      type: '',
      oldBalanceOrg: '',
      newBalanceOrig: '',
      oldBalanceDest: '',
      newBalanceDest: '',
      transFrequency: '0',
      isMerchantDest: false,
    });
    setResult(null);
    toast({
      title: "Form Reset",
      description: "All form fields have been cleared.",
    });
  };

  // Helper function to validate the form
  const validateForm = (): boolean => {
    // Check for empty required fields
    if (!formData.amount || !formData.type || 
        !formData.oldBalanceOrg || !formData.newBalanceOrig || 
        !formData.oldBalanceDest || !formData.newBalanceDest) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return false;
    }
    
    // Validate amount is a positive number
    if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      toast({
        title: "Validation Error",
        description: "Amount must be a positive number.",
        variant: "destructive",
      });
      return false;
    }
    
    // Validate balance fields are numbers
    const balanceFields = [
      { name: 'Originator Balance Before', value: formData.oldBalanceOrg },
      { name: 'Originator Balance After', value: formData.newBalanceOrig },
      { name: 'Destination Balance Before', value: formData.oldBalanceDest },
      { name: 'Destination Balance After', value: formData.newBalanceDest }
    ];
    
    for (const field of balanceFields) {
      if (isNaN(Number(field.value))) {
        toast({
          title: "Validation Error",
          description: `${field.name} must be a number.`,
          variant: "destructive",
        });
        return false;
      }
    }
    
    // Validate transaction frequency is a non-negative integer
    if (isNaN(Number(formData.transFrequency)) || Number(formData.transFrequency) < 0 || 
        !Number.isInteger(Number(formData.transFrequency))) {
      toast({
        title: "Validation Error",
        description: "Transaction frequency must be a non-negative integer.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  // Submit form and get prediction
  const handleSubmit = async () => {
    // Validate the form
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      // In a real app, this would be a fetch to your backend API
      // For the demo, we'll simulate a response after a small delay
      setTimeout(() => {
        // For demonstration, we'll create a mock prediction
        // In a real app, this would come from your ML model via the backend
        let isFraud = false;
        let fraudProb = 0;
        const amount = Number(formData.amount);
        
        // Apply some simple rules for the demo
        // In reality, this would be your ML model's prediction
        if (amount > 10000) {
          isFraud = true;
          fraudProb = 0.95;
        } else if (formData.type === 'TRANSFER' && amount > 5000) {
          isFraud = true;
          fraudProb = 0.85;
        } else if (formData.transFrequency !== '0' && Number(formData.transFrequency) > 3) {
          isFraud = true;
          fraudProb = 0.75;
        } else {
          // Random chance of fraud for demonstration
          fraudProb = Math.random() * 0.4; // Max 40% chance
          isFraud = fraudProb > 0.3;
        }
        
        setResult({
          prediction: isFraud ? 'Fraud' : 'Non-Fraud',
          fraudProbability: Number((fraudProb * 100).toFixed(1))
        });
        
        toast({
          title: "Analysis Complete",
          description: `Transaction prediction: ${isFraud ? 'Potential Fraud Detected' : 'No Fraud Detected'}`,
          variant: isFraud ? "destructive" : "default",
        });
        
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error processing the transaction:", error);
      toast({
        title: "Error",
        description: "There was an error processing your transaction. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-fraud-blue mb-4">
            Credit Card Fraud Detection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Input transaction details below to get real-time fraud predictions powered by advanced machine learning.
          </p>
        </motion.section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-fraud-blue mb-6">
                Transaction Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Transaction Date and Time */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Label htmlFor="transTime">
                    Transaction Date and Time <span className="text-red-500">*</span>
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Input
                            id="transTime"
                            name="transTime"
                            type="datetime-local"
                            value={formData.transTime}
                            onChange={handleInputChange}
                            className="w-full"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Enter the date and time the transaction occurred</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>

                {/* Amount */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Label htmlFor="amount">
                    Amount ($) <span className="text-red-500">*</span>
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Input
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder="e.g., 149.62"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="w-full"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Enter transaction amount in USD, e.g., 149.62</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>

                {/* Transaction Type */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Label htmlFor="type">
                    Transaction Type <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange(value, 'type')}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select transaction type" />
                          </SelectTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Select the type of transaction</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <SelectContent>
                      <SelectItem value="PAYMENT">PAYMENT</SelectItem>
                      <SelectItem value="TRANSFER">TRANSFER</SelectItem>
                      <SelectItem value="CASH_OUT">CASH_OUT</SelectItem>
                      <SelectItem value="CASH_IN">CASH_IN</SelectItem>
                      <SelectItem value="DEBIT">DEBIT</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                {/* Originator Balance Before */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Label htmlFor="oldBalanceOrg">
                    Originator Balance Before ($) <span className="text-red-500">*</span>
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Input
                            id="oldBalanceOrg"
                            name="oldBalanceOrg"
                            type="number"
                            placeholder="e.g., 1000"
                            value={formData.oldBalanceOrg}
                            onChange={handleInputChange}
                            className="w-full"
                            step="0.01"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Originator's balance before the transaction</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>

                {/* Originator Balance After */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Label htmlFor="newBalanceOrig">
                    Originator Balance After ($) <span className="text-red-500">*</span>
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Input
                            id="newBalanceOrig"
                            name="newBalanceOrig"
                            type="number"
                            placeholder="e.g., 850.38"
                            value={formData.newBalanceOrig}
                            onChange={handleInputChange}
                            className="w-full"
                            step="0.01"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Originator's balance after the transaction</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>

                {/* Destination Balance Before */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <Label htmlFor="oldBalanceDest">
                    Destination Balance Before ($) <span className="text-red-500">*</span>
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Input
                            id="oldBalanceDest"
                            name="oldBalanceDest"
                            type="number"
                            placeholder="e.g., 500"
                            value={formData.oldBalanceDest}
                            onChange={handleInputChange}
                            className="w-full"
                            step="0.01"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Destination's balance before the transaction</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>

                {/* Destination Balance After */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <Label htmlFor="newBalanceDest">
                    Destination Balance After ($) <span className="text-red-500">*</span>
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Input
                            id="newBalanceDest"
                            name="newBalanceDest"
                            type="number"
                            placeholder="e.g., 649.62"
                            value={formData.newBalanceDest}
                            onChange={handleInputChange}
                            className="w-full"
                            step="0.01"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Destination's balance after the transaction</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>

                {/* Transaction Frequency */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                >
                  <Label htmlFor="transFrequency">
                    Transaction Frequency (Last Hour)
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Input
                            id="transFrequency"
                            name="transFrequency"
                            type="number"
                            placeholder="e.g., 2"
                            value={formData.transFrequency}
                            onChange={handleInputChange}
                            className="w-full"
                            min="0"
                            step="1"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Number of transactions by the originator in the last hour</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>

                {/* Is Merchant Destination */}
                <motion.div 
                  className="space-y-2 flex items-end"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.0 }}
                >
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="isMerchantDest" 
                              checked={formData.isMerchantDest}
                              onCheckedChange={handleCheckboxChange}
                            />
                            <Label htmlFor="isMerchantDest" className="cursor-pointer">
                              Is Merchant Destination
                            </Label>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>Check if the destination is a merchant account</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </motion.div>
              </div>

              {/* Form Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="border-fraud-blue text-fraud-blue hover:bg-fraud-blue/5"
                >
                  Reset Form
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="bg-fraud-blue hover:bg-blue-800 text-white flex items-center space-x-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-white/50 border-t-white rounded-full" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze Transaction</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass rounded-xl p-6 shadow-lg h-full">
              <h2 className="text-2xl font-semibold text-fraud-blue mb-6">
                Analysis Results
              </h2>

              {result ? (
                <motion.div 
                  className="space-y-6"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="text-center">
                    <h3 className="text-xl font-medium mb-2">Prediction:</h3>
                    <div className={`text-2xl font-bold ${
                      result.prediction === 'Fraud' 
                        ? 'text-fraud-danger' 
                        : 'text-fraud-success'
                    }`}>
                      {result.prediction}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium">Fraud Probability:</h3>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div className="text-md font-semibold inline-block">
                          {result.fraudProbability}%
                        </div>
                      </div>
                      <div className="flex h-2 overflow-hidden bg-gray-200 rounded">
                        <motion.div 
                          className={`${
                            result.fraudProbability > 70 
                              ? 'bg-fraud-danger' 
                              : result.fraudProbability > 30 
                                ? 'bg-yellow-400' 
                                : 'bg-fraud-success'
                          }`}
                          initial={{ width: '0%' }}
                          animate={{ width: `${result.fraudProbability}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Radial Progress for Visualization */}
                  <div className="flex justify-center pt-4">
                    <div className="relative w-36 h-36">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background Circle */}
                        <circle 
                          className="text-gray-200" 
                          strokeWidth="10" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="40" 
                          cx="50" 
                          cy="50" 
                        />
                        
                        {/* Foreground Circle */}
                        <motion.circle 
                          className={`${
                            result.fraudProbability > 70 
                              ? 'text-fraud-danger' 
                              : result.fraudProbability > 30 
                                ? 'text-yellow-400' 
                                : 'text-fraud-success'
                          }`}
                          strokeWidth="10" 
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 * (1 - result.fraudProbability / 100)}
                          strokeLinecap="round" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="40" 
                          cx="50" 
                          cy="50"
                          initial={{ strokeDashoffset: 251.2 }}
                          animate={{ strokeDashoffset: 251.2 * (1 - result.fraudProbability / 100) }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        
                        {/* Text in the middle */}
                        <text 
                          x="50%" 
                          y="50%" 
                          dominantBaseline="middle" 
                          textAnchor="middle"
                          className="text-lg font-bold"
                          fill={
                            result.fraudProbability > 70 
                              ? '#EF4444'
                              : result.fraudProbability > 30 
                                ? '#FBBF24'
                                : '#10B981'
                          }
                        >
                          {result.fraudProbability}%
                        </text>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-xl font-medium mb-2">Recommendation:</h3>
                    <p className={`${
                      result.prediction === 'Fraud' 
                        ? 'text-fraud-danger' 
                        : 'text-fraud-success'
                    }`}>
                      {result.prediction === 'Fraud'
                        ? 'Further investigation recommended. Consider contacting the account holder.'
                        : 'Transaction appears legitimate. No action required.'
                      }
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <p className="text-center">
                    Submit transaction details to see fraud analysis results here.
                  </p>
                  <div className="w-24 h-24 border-4 border-dashed rounded-full animate-spin border-gray-300" />
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-fraud-blue text-center mb-8">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass p-6 rounded-xl">
              <div className="h-12 w-12 bg-fraud-blue/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fraud-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Analysis</h3>
              <p className="text-gray-600">
                Get instant fraud predictions for credit card transactions using our advanced machine learning model.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass p-6 rounded-xl">
              <div className="h-12 w-12 bg-fraud-blue/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fraud-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Processing</h3>
              <p className="text-gray-600">
                Your transaction data is processed securely without storing sensitive information on our servers.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass p-6 rounded-xl">
              <div className="h-12 w-12 bg-fraud-blue/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fraud-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Results</h3>
              <p className="text-gray-600">
                View fraud probability scores and recommendations to help you make informed decisions.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
      
      {/* Floating Chatbot */}
      <Chatbot />
    </>
  );
};

export default HomePage;
