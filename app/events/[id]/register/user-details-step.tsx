'use client';

import { useState } from 'react';

interface UserDetailsStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  goToNextStep: () => void;
}

export default function UserDetailsStep({ 
  formData, 
  updateFormData, 
  goToNextStep 
}: UserDetailsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects like emergencyContact.name
      const [parent, child] = name.split('.');
      updateFormData({
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      updateFormData({ [name]: value });
    }
    
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
    
    // Required fields
    const requiredFields = [
      'firstName', 
      'lastName', 
      'email', 
      'phone', 
      'dateOfBirth',
      'gender',
      'country',
      'emergencyContact.name',
      'emergencyContact.phone',
      'emergencyContact.relation'
    ];
    
    requiredFields.forEach(field => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        if (!formData[parent][child]) {
          newErrors[field] = 'This field is required';
        }
      } else if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors['email'] = 'Please enter a valid email address';
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
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-white">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="firstName">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            aria-invalid={errors.firstName ? "true" : "false"}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="lastName">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            aria-invalid={errors.lastName ? "true" : "false"}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="phone">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            aria-invalid={errors.phone ? "true" : "false"}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="dateOfBirth">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            aria-invalid={errors.dateOfBirth ? "true" : "false"}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="gender">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            aria-invalid={errors.gender ? "true" : "false"}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Address</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="address">
              Street Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="city">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="country">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              id="country"
              name="country"
              type="text"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              aria-invalid={errors.country ? "true" : "false"}
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-500">{errors.country}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Emergency Contact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="emergencyContactName">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="emergencyContactName"
              name="emergencyContact.name"
              type="text"
              value={formData.emergencyContact.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              aria-invalid={errors['emergencyContact.name'] ? "true" : "false"}
            />
            {errors['emergencyContact.name'] && (
              <p className="mt-1 text-sm text-red-500">{errors['emergencyContact.name']}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="emergencyContactPhone">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="emergencyContactPhone"
              name="emergencyContact.phone"
              type="tel"
              value={formData.emergencyContact.phone}
              onChange={handleInputChange}
              className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              aria-invalid={errors['emergencyContact.phone'] ? "true" : "false"}
            />
            {errors['emergencyContact.phone'] && (
              <p className="mt-1 text-sm text-red-500">{errors['emergencyContact.phone']}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="emergencyContactRelation">
              Relationship <span className="text-red-500">*</span>
            </label>
            <input
              id="emergencyContactRelation"
              name="emergencyContact.relation"
              type="text"
              value={formData.emergencyContact.relation}
              onChange={handleInputChange}
              className="w-full p-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              aria-invalid={errors['emergencyContact.relation'] ? "true" : "false"}
            />
            {errors['emergencyContact.relation'] && (
              <p className="mt-1 text-sm text-red-500">{errors['emergencyContact.relation']}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
} 