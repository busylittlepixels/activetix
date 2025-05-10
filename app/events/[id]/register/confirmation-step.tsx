'use client';

import { useState } from 'react';

interface ConfirmationStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  goToPreviousStep: () => void;
  handleSubmit: () => void;
  event: any;
}

export default function ConfirmationStep({
  formData,
  updateFormData,
  goToPreviousStep,
  handleSubmit,
  event
}: ConfirmationStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateFormData({ [name]: checked });
    
    // Clear error when user checks a box
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
    
    // Required checkboxes
    const requiredFields = ['acceptTerms', 'acceptPrivacy', 'acceptWaiver'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'You must accept this to continue';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      handleSubmit();
    }
  };
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };
  
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-white">Review & Confirm</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Event Details</h3>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Event</span>
            <span className="text-white font-medium">{event.title}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Date</span>
            <span className="text-white font-medium">{event.date}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Location</span>
            <span className="text-white font-medium">{event.location.city}, {event.location.country}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Distance</span>
            <span className="text-white font-medium">{event.distance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Type</span>
            <span className="text-white font-medium">{event.eventType}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Personal Information</h3>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-300 text-sm">Full Name</p>
              <p className="text-white">{formData.firstName} {formData.lastName}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Email</p>
              <p className="text-white">{formData.email}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Phone</p>
              <p className="text-white">{formData.phone}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Date of Birth</p>
              <p className="text-white">{formatDate(formData.dateOfBirth)}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Gender</p>
              <p className="text-white">{formData.gender}</p>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Country</p>
              <p className="text-white">{formData.country}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-300 text-sm">Emergency Contact</p>
              <p className="text-white">
                {formData.emergencyContact.name} ({formData.emergencyContact.relation}) - {formData.emergencyContact.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Payment Details</h3>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <div className="mb-4">
            <p className="text-gray-300 text-sm">Payment Method</p>
            <p className="text-white capitalize">{formData.paymentMethod === 'credit' ? 'Credit Card' : 'PayPal'}</p>
          </div>
          
          {formData.paymentMethod === 'credit' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 text-sm">Card Number</p>
                <p className="text-white">•••• •••• •••• {formData.cardNumber.slice(-4)}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Cardholder</p>
                <p className="text-white">{formData.cardholderName}</p>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-700 mt-4 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Registration Fee</span>
              <span className="text-white">{event.price}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Processing Fee</span>
              <span className="text-white">€5.00</span>
            </div>
            <div className="border-t border-gray-700 my-2 pt-2">
              <div className="flex justify-between font-bold">
                <span className="text-gray-300">Total</span>
                <span className="text-white">
                  {(() => {
                    const priceValue = parseInt(event.price.replace(/[^0-9]/g, ''));
                    return `€${priceValue + 5}`;
                  })()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Agreements</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5 mt-1">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 border-gray-600 rounded focus:ring-blue-600 focus:ring-offset-gray-800"
                aria-invalid={errors.acceptTerms ? "true" : "false"}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptTerms" className="text-gray-300">
                I accept the <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a> <span className="text-red-500">*</span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1 text-sm text-red-500">{errors.acceptTerms}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5 mt-1">
              <input
                id="acceptPrivacy"
                name="acceptPrivacy"
                type="checkbox"
                checked={formData.acceptPrivacy}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 border-gray-600 rounded focus:ring-blue-600 focus:ring-offset-gray-800"
                aria-invalid={errors.acceptPrivacy ? "true" : "false"}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptPrivacy" className="text-gray-300">
                I accept the <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a> <span className="text-red-500">*</span>
              </label>
              {errors.acceptPrivacy && (
                <p className="mt-1 text-sm text-red-500">{errors.acceptPrivacy}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5 mt-1">
              <input
                id="acceptWaiver"
                name="acceptWaiver"
                type="checkbox"
                checked={formData.acceptWaiver}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 border-gray-600 rounded focus:ring-blue-600 focus:ring-offset-gray-800"
                aria-invalid={errors.acceptWaiver ? "true" : "false"}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptWaiver" className="text-gray-300">
                I accept the <a href="#" className="text-blue-500 hover:underline">Liability Waiver</a>. I understand that participating in this event is potentially hazardous and I should not participate unless I am physically able and properly trained. <span className="text-red-500">*</span>
              </label>
              {errors.acceptWaiver && (
                <p className="mt-1 text-sm text-red-500">{errors.acceptWaiver}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5 mt-1">
              <input
                id="receiveUpdates"
                name="receiveUpdates"
                type="checkbox"
                checked={formData.receiveUpdates}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 border-gray-600 rounded focus:ring-blue-600 focus:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="receiveUpdates" className="text-gray-300">
                I would like to receive updates about this event and future events
              </label>
            </div>
          </div>
        </div>
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
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          Complete Registration
        </button>
      </div>
    </form>
  );
} 