'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { InnerPageLayout } from '../../../../components/inner-page-layout';
import { raceEvents } from '../../../../components/featured-races';

// Step components
import UserDetailsStep from './user-details-step';
import PaymentDetailsStep from './payment-details-step';
import ConfirmationStep from './confirmation-step';

export default function RegisterPage() {
  const router = useRouter();
  const params = useParams();
  const [event, setEvent] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // User details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    country: '',
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    },
    
    // Payment details
    paymentMethod: 'credit',
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    
    // Confirmation
    acceptTerms: false,
    acceptPrivacy: false,
    acceptWaiver: false,
    receiveUpdates: true
  });
  
  // Find the event by ID
  useEffect(() => {
    if (params.id) {
      const eventId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundEvent = raceEvents.find(e => e.id === eventId);
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        // Redirect to events page if event not found
        router.push('/events');
      }
    }
  }, [params.id, router]);
  
  const updateFormData = (stepData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };
  
  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
    window.scrollTo(0, 0);
  };
  
  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = () => {
    // In a real app, you would submit the form data to your backend here
    console.log('Form submitted with data:', formData);
    
    // Redirect to a success page
    router.push(`/events/${params.id}/register/success`);
  };
  
  if (!event) {
    return (
      <InnerPageLayout title="Loading..." subtitle="Please wait">
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </InnerPageLayout>
    );
  }
  
  return (
    <InnerPageLayout
      title={`Register for ${event.title}`}
      subtitle={`${event.date} • ${event.location.city}, ${event.location.country}`}
      isEventPage={true}
    >
      <div className="max-w-3xl mx-auto pb-16">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600">
                Step {currentStep} of 3
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {Math.round((currentStep / 3) * 100)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-800">
              <div
                style={{ width: `${(currentStep / 3) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <div className={`${currentStep >= 1 ? 'text-blue-400' : ''}`}>Your Details</div>
            <div className={`${currentStep >= 2 ? 'text-blue-400' : ''}`}>Payment</div>
            <div className={`${currentStep >= 3 ? 'text-blue-400' : ''}`}>Confirmation</div>
          </div>
        </div>
        
        <div className="bg-black/50 border border-gray-800 rounded-xl p-6 md:p-8 shadow-xl">
          {currentStep === 1 && (
            <UserDetailsStep 
              formData={formData} 
              updateFormData={updateFormData} 
              goToNextStep={goToNextStep} 
            />
          )}
          
          {currentStep === 2 && (
            <PaymentDetailsStep 
              formData={formData} 
              updateFormData={updateFormData} 
              goToNextStep={goToNextStep} 
              goToPreviousStep={goToPreviousStep}
              eventPrice={event.price}
            />
          )}
          
          {currentStep === 3 && (
            <ConfirmationStep 
              formData={formData} 
              updateFormData={updateFormData} 
              goToPreviousStep={goToPreviousStep}
              handleSubmit={handleSubmit} 
              event={event}
            />
          )}
        </div>
      </div>
    </InnerPageLayout>
  );
} 