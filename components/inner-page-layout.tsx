'use client';

import { ReactNode } from 'react';
import { PageContainer } from './page-container';
import { Footer } from './footer';

interface ShareButtonProps {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'email';
  url: string;
  title: string;
}

const ShareButton = ({ platform, url, title }: ShareButtonProps) => {
  const getShareUrl = () => {
    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      case 'email':
        return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this event: ${url}`)}`;
      default:
        return '#';
    }
  };
  
  const getIcon = () => {
    switch (platform) {
      case 'facebook':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z" />
          </svg>
        );
      case 'email':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <a 
      href={getShareUrl()} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
      aria-label={`Share on ${platform}`}
    >
      {getIcon()}
    </a>
  );
};

interface InnerPageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  headerImage?: string;
  fullWidth?: boolean;
  isEventPage?: boolean;
}

export function InnerPageLayout({
  children,
  title,
  subtitle,
  headerImage,
  fullWidth = false,
  isEventPage = false
}: InnerPageLayoutProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Image Banner */}
      {headerImage && (
        <div className="relative w-full h-72 md:h-96 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${headerImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
          </div>
          <PageContainer className="relative h-full flex flex-col justify-end pb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="text-left">
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h1>
                {subtitle && <p className="text-white/80 text-lg md:text-xl mt-3 max-w-2xl">{subtitle}</p>}
              </div>
              
              {isEventPage && (
                <div className="flex gap-2">
                  <ShareButton platform="facebook" url={currentUrl} title={title} />
                  <ShareButton platform="twitter" url={currentUrl} title={title} />
                  <ShareButton platform="linkedin" url={currentUrl} title={title} />
                  <ShareButton platform="email" url={currentUrl} title={title} />
                </div>
              )}
            </div>
          </PageContainer>
        </div>
      )}

      {/* Title without Image */}
      {!headerImage && (
        <div className="w-full bg-background pt-32 pb-12">
          <PageContainer>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="text-left">
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h1>
                {subtitle && <p className="text-white/80 text-lg md:text-xl mt-3 max-w-2xl">{subtitle}</p>}
              </div>
              
              {isEventPage && (
                <div className="flex gap-2">
                  <ShareButton platform="facebook" url={currentUrl} title={title} />
                  <ShareButton platform="twitter" url={currentUrl} title={title} />
                  <ShareButton platform="linkedin" url={currentUrl} title={title} />
                  <ShareButton platform="email" url={currentUrl} title={title} />
                </div>
              )}
            </div>
          </PageContainer>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow w-full py-12 bg-background">
        {fullWidth ? (
          children
        ) : (
          <PageContainer>
            {children}
          </PageContainer>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
} 