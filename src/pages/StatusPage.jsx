import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatusPage = () => {
  const [status, setStatus] = useState('Checking...');
  const [isOnline, setIsOnline] = useState(false);

  // Function to check OpenAI's operational status
  const checkStatus = async () => {
    try {
      const response = await axios.get('https://api.openai.com/v1/engines', {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      });
      if (response.status === 200) {
        setStatus('Operational');
        setIsOnline(true);
      } else {
        setStatus('Service Unavailable');
        setIsOnline(false);
      }
    } catch (error) {
      console.error('Error fetching OpenAI status:', error);
      setStatus('Service Unavailable');
      setIsOnline(false);
    }
  };

  useEffect(() => {
    checkStatus(); // Check status on page load
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Service Status</h2>
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-700">
            OpenAI Service Status:
          </h3>
          <p className={`text-2xl font-semibold ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
            {status}
          </p>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-xl font-medium text-gray-700 mb-4">
            Check if our chat service is available:
          </h3>
          <p className={`text-lg ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
            {isOnline ? 'AI Chat Service is Online' : 'AI Chat Service is Offline'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
