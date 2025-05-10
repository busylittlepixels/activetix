'use client';

import { useState } from 'react';

interface PaymentDetailsStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  eventPrice: string;
}

export default function PaymentDetailsStep({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  eventPrice
}: PaymentDetailsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Skip validation if payment method is not credit card
    if (formData.paymentMethod === 'credit') {
      // Required fields
      const requiredFields = ['cardNumber', 'cardholderName', 'expiryDate', 'cvv'];
      
      requiredFields.forEach(field => {
        if (!formData[field]) {
          newErrors[field] = 'This field is required';
        }
      });
      
      // Card number validation (basic)
      if (formData.cardNumber && !/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors['cardNumber'] = 'Please enter a valid card number';
      }
      
      // Expiry date validation (MM/YY format)
      if (formData.expiryDate && !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
        newErrors['expiryDate'] = 'Please use MM/YY format';
      }
      
      // CVV validation
      if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
        newErrors['cvv'] = 'Please enter a valid CVV';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      goToNextStep();
    } else {
      // Scroll to first error
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  // Format credit card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    updateFormData({ cardNumber: formattedValue });
    
    if (errors.cardNumber) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.cardNumber;
        return newErrors;
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-white">Payment Details</h2>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Order Summary</h3>
          <div className="text-xl font-bold text-white">{eventPrice}</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Registration Fee</span>
            <span className="text-white">{eventPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Processing Fee</span>
            <span className="text-white">€5.00</span>
          </div>
          <div className="border-t border-gray-700 my-2"></div>
          <div className="flex justify-between font-bold">
            <span className="text-gray-300">Total</span>
            <span className="text-white">
              {(() => {
                const priceValue = parseInt(eventPrice.replace(/[^0-9]/g, ''));
                return `€${priceValue + 5}`;
              })()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Payment Method</h3>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <label className="flex items-center p-4 bg-gray-900 rounded-lg cursor-pointer border border-transparent hover:border-blue-600 transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="credit"
              checked={formData.paymentMethod === 'credit'}
              onChange={handleInputChange}
              className="mr-3"
            />
            <div>
              <div className="text-white font-medium">Credit Card</div>
              <div className="text-gray-400 text-sm">Pay using your credit or debit card</div>
            </div>
            <div className="ml-auto flex gap-2">
              <span className="w-8 h-5 bg-blue-600 rounded"></span>
              <span className="w-8 h-5 bg-gray-600 rounded"></span>
              <span className="w-8 h-5 bg-yellow-600 rounded"></span>
            </div>
          </label>
          
          <label className="flex items-center p-4 bg-gray-900 rounded-lg cursor-pointer border border-transparent hover:border-blue-600 transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === 'paypal'}
              onChange={handleInputChange}
              className="mr-3"
            />
            <div>
              <div className="text-white font-medium">PayPal</div>
              <div className="text-gray-400 text-sm">Pay using your PayPal account</div>
            </div>
            <div className="ml-auto">
              <span className="w-8 h-5 bg-blue-400 rounded"></span>
            </div>
          </label>
        </div>
        
        {formData.paymentMethod === 'credit' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="cardNumber">
                Card Number <span className="text-red-500">*</span>
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                aria-invalid={errors.cardNumber ? "true" : "false"}
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="cardholderName">
                Cardholder Name <span className="text-red-500">*</span>
              </label>
              <input
                id="cardholderName"
                name="cardholderName"
                type="text"
                value={formData.cardholderName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                aria-invalid={errors.cardholderName ? "true" : "false"}
              />
              {errors.cardholderName && (
                <p className="mt-1 text-sm text-red-500">{errors.cardholderName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="expiryDate">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                id="expiryDate"
                name="expiryDate"
                type="text"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                aria-invalid={errors.expiryDate ? "true" : "false"}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="cvv">
                CVV <span className="text-red-500">*</span>
              </label>
              <input
                id="cvv"
                name="cvv"
                type="text"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength={4}
                className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                aria-invalid={errors.cvv ? "true" : "false"}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
              )}
            </div>
          </div>
        )}
        
        {formData.paymentMethod === 'paypal' && (
          <div className="bg-gray-900 rounded-lg p-6 text-center">
            <p className="text-gray-300 mb-4">You will be redirected to PayPal to complete your payment.</p>
            <div className="inline-block bg-blue-400 text-white font-bold px-4 py-2 rounded">PayPal</div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={goToPreviousStep}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
        >
          Back
        </button>
        
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Continue to Confirmation
        </button>
      </div>
    </form>
  );
} 