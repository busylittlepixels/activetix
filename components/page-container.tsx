'use client';

import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  noHeaderSpacing?: boolean;
}

/**
 * Page container component that provides consistent layout constraints
 * @param children - Page content
 * @param className - Additional CSS classes
 * @param fullWidth - If true, content will not be constrained (for hero sections, etc.)
 * @param noHeaderSpacing - If true, doesn't add top margin (for cases where spacing is handled elsewhere)
 */
export function PageContainer({ 
  children, 
  className = '', 
  fullWidth = false,
  noHeaderSpacing = false
}: PageContainerProps) {
  const headerSpacing = !noHeaderSpacing ? 'mt-8' : '';
  
  if (fullWidth) {
    return <div className={`w-full ${headerSpacing} ${className}`}>{children}</div>;
  }
  
  return (
    <div className={`w-full ${headerSpacing} ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {children}
      </div>
    </div>
  );
} 