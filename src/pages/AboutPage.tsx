import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Chatbot from '@/components/chatbot/Chatbot';

const AboutPage = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section with Gradient Background */}
        <motion.section
          className="relative rounded-2xl p-12 mb-16 overflow-hidden glass"
          style={{
            background: "linear-gradient(to right, rgba(30, 58, 138, 0.8), rgba(59, 130, 246, 0.6))"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10 text-white text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              About FraudGuard
            </motion.h1>
            <motion.p 
              className="text-xl max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              An AI-powered web application for detecting credit card fraud in real-time,
              designed for bank staff and analysts to input transaction details easily and get immediate insights.
            </motion.p>
          </div>
          
          {/* Decorative floating elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
          </div>
        </motion.section>
        
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Project Overview Card */}
          <motion.div
            className="glass p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-fraud-blue/10 rounded-full flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-fraud-blue" />
              </div>
              <h2 className="text-2xl font-bold text-fraud-blue">Project Overview</h2>
            </div>
            <p className="text-gray-700 mb-4">
              FraudGuard is an AI-powered web application for detecting credit card fraud in real-time, designed for bank staff and analysts to input transaction details easily.
            </p>
            <p className="text-gray-700">
              Our solution provides immediate fraud risk assessment through a user-friendly interface, helping financial institutions protect their customers from fraudulent activities.
            </p>
          </motion.div>
          
          {/* Dataset Card */}
          <motion.div
            className="glass p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-fraud-blue/10 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fraud-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-fraud-blue">Dataset</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Built on the PaySim Synthetic Dataset, with 6.3 million transactions featuring intuitive fields like transaction amount, type, and account balances.
            </p>
            <p className="text-gray-700">
              The dataset was designed specifically for fraud detection research, providing a realistic simulation of mobile money transactions with labeled fraud cases.
            </p>
            <div className="mt-4">
              <a 
                href="https://www.kaggle.com/datasets/ealaxi/paysim1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-fraud-blue hover:underline font-medium inline-flex items-center"
              >
                Explore the dataset
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </motion.div>
          
          {/* Model Card */}
          <motion.div
            className="glass p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-fraud-blue/10 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fraud-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-fraud-blue">Model</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Uses a Random Forest model with an F1-score &gt; 0.90, optimized for imbalanced fraud data using SMOTE.
            </p>
            <p className="text-gray-700">
              Our model has been trained to detect patterns of fraudulent behavior from transaction details, account balances, and transaction frequency, providing high accuracy even with the highly imbalanced nature of fraud data.
            </p>
          </motion.div>
          
          {/* Links Card */}
          <motion.div
            className="glass p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 bg-fraud-blue/10 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-fraud-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-fraud-blue">Learn More</h2>
            </div>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.kaggle.com/datasets/ealaxi/paysim1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-fraud-blue hover:underline font-medium inline-flex items-center"
                >
                  PaySim Dataset on Kaggle
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-fraud-blue hover:underline font-medium inline-flex items-center"
                >
                  GitHub Repository
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a 
                  href="https://scikit-learn.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-fraud-blue hover:underline font-medium inline-flex items-center"
                >
                  Machine Learning Documentation
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Technical Details Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-fraud-blue mb-8 text-center">Technical Details</h2>
          
          <div className="glass p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">PaySim Dataset Features</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">step</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Time step (1 step = 1 hour)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">type</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Transaction type (PAYMENT, TRANSFER, CASH_OUT, CASH_IN, DEBIT)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">amount</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Transaction amount</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">oldbalanceOrg</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Originator's balance before transaction</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">newbalanceOrig</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Originator's balance after transaction</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">oldbalanceDest</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Destination's balance before transaction</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">newbalanceDest</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Destination's balance after transaction</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">isFraud</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Target (1 = fraud, 0 = non-fraud)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Machine Learning Approach</h3>
              <p className="text-gray-700 mb-4">
                Our model uses a Random Forest classifier trained on the PaySim dataset with additional engineered features to improve detection accuracy:
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Feature engineering: Added hour of day and balance change features</li>
                <li>Data balancing: Used SMOTE (Synthetic Minority Over-sampling Technique) to address the class imbalance (only 0.13% of transactions are fraudulent)</li>
                <li>Model tuning: Optimized hyperparameters using cross-validation</li>
                <li>Evaluation: Achieved F1-score > 0.90 on test data</li>
              </ul>
            </div>
          </div>
        </motion.section>
        
        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-fraud-blue mb-8 text-center">Our Team</h2>
          
          <div className="glass p-8 rounded-xl shadow-lg text-center">
            <p className="text-lg text-gray-700 mb-6">
              FraudGuard is developed by a team of data scientists, ML engineers, and financial experts committed to fighting financial fraud.
            </p>
            
            <div className="flex justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-fraud-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.section>
      </div>
      
      {/* Floating Chatbot */}
      <Chatbot />
    </>
  );
};

export default AboutPage;
