'use client';

import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

/**
 * Page container component that provides consistent layout constraints
 * @param children - Page content
 * @param className - Additional CSS classes
 * @param fullWidth - If true, content will not be constrained (for hero sections, etc.)
 */
export function PageContainer({ 
  children, 
  className = '', 
  fullWidth = false 
}: PageContainerProps) {
  if (fullWidth) {
    return <div className={`w-full ${className}`}>{children}</div>;
  }
  
  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
} 