'use client';

import Image from 'next/image';
import { ImageWithSizeOverlay } from './image-with-size-overlay';
import { ContextAlert } from 'components/context-alert';
import { Markdown } from 'components/markdown';
import { getNetlifyContext } from 'utils';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Metadata needs to be in a separate layout file for client components
const sampleImage = '/images/corgi.jpg';

const ctx = getNetlifyContext();
const forceWebP = ctx === 'dev';
const sampleImageSrcSet = [640, 1280, 2048]
    .map((size) => {
        return `/.netlify/images?url=${sampleImage}&w=${size}${forceWebP ? '&fm=webp' : ''} ${size}w`;
    })
    .join(', ');

const nextImageSnippet = `
When running on Netlify, \`next/image\` is automatically set-up to use Netlify Image CDN for optimized images.

~~~jsx
import Image from 'next/image';

// In your component
<Image src="/images/corgi.jpg" alt="Corgi" /* ... additional props */ />
~~~
`;

const originalVsCdnSnippet = `
In the code below, a regular \`<img>\` tag is used in both cases for a framework-agnostic example. 
Other than using \`next/image\` or rolling your own \`<img>\` tags, you can also use the excellent [unpic-img](https://unpic.pics/).

~~~jsx
// <== On the left, the original image
<img src="/images/corgi.jpg" alt="Corgi" />

// ==> On the right, explicitly using Netlify Image CDN endpoint for a responsive image
<img 
  srcSet="/.netlify/images?url=images/corgi.jpg&w=640 640w, /.netlify/images?url=images/corgi.jpg&w=1280 1280w, /.netlify/images?url=images/corgi.jpg&w=2048 2048w"
  sizes="(max-width: 1024px) 100vw, 1024px" 
  alt="Corgi" 
/>
~~~
`;

const devModeWarning = `
In local development, optimization is performed locally without automatic format
detection, so format is set to WebP.
`;

export default function Page() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLElement>(null);
    const compareRef = useRef<HTMLElement>(null);
    const sectionsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        // Animate title
        if (titleRef.current) {
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        }

        // Animate sections
        const sections = sectionsRef.current;
        if (sections.length) {
            sections.forEach((section, i) => {
                gsap.fromTo(section,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 0.2 + (i * 0.2),
                        ease: "power3.out"
                    }
                );
            });
        }

        // Animate the image appearance
        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1, delay: 0.5, ease: "elastic.out(1, 0.5)" }
            );
        }

        // Animate the comparison slider
        if (compareRef.current) {
            gsap.fromTo(compareRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 0.8, ease: "power2.inOut" }
            );
        }
    }, []);

    const addToRefs = (el: HTMLElement | null) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            <section>
                <ContextAlert
                    warningMessage={devModeWarning}
                    className="mb-6"
                />
                <h1 ref={titleRef}>Image CDN</h1>
            </section>
            <section ref={addToRefs}>
                <h2 className="mb-6">Using next/image component</h2>
                <Markdown content={nextImageSnippet} className="mb-8" />
                <figure ref={imageRef} className="transition-all">
                    <div className="relative overflow-hidden border-2 border-white rounded-lg aspect-3/2 shadow-lg">
                        <Image
                            src="/images/corgi.jpg"
                            priority
                            fill={true}
                            style={{ objectFit: 'contain' }}
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            alt="Corgi"
                        />
                    </div>
                    <figcaption className="mt-2 text-sm italic">
                        Credit: photo by{' '}
                        <a href="https://unsplash.com/@alvannee?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                            Alvan Nee
                        </a>{' '}
                        on{' '}
                        <a href="https://unsplash.com/photos/long-coated-white-and-brown-dog-lvFlpqEvuRM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                            Unsplash
                        </a>
                    </figcaption>
                </figure>
            </section>
            <section ref={addToRefs}>
                <h2 className="mb-6">Original vs. optimized image: can you tell the difference?</h2>
                <Markdown content={originalVsCdnSnippet} className="mb-8" />
                <figure
                    ref={compareRef}
                    className="relative grid w-full overflow-hidden border-2 border-white rounded-lg select-none diff aspect-3/2 shadow-lg"
                    tabIndex={0}
                >
                    <div className="relative col-start-1 row-start-1 overflow-hidden border-r-2 z-1 border-r-white diff-item-1">
                        <div>
                            <ImageWithSizeOverlay src="/images/corgi.jpg" />
                        </div>
                    </div>
                    <div className="relative col-start-1 row-start-1 diff-item-2" tabIndex={0}>
                        <div>
                            <ImageWithSizeOverlay
                                src={sampleImage}
                                srcSet={sampleImageSrcSet}
                                sizes={sampleImageSrcSet}
                                overlayPosition="right"
                            />
                        </div>
                    </div>
                    <div className="relative h-2 col-start-1 row-start-1 overflow-hidden opacity-0 resize-x diff-resizer z-1 min-w-4 cursor-ew-resize top-1/2"></div>
                </figure>
            </section>
        </div>
    );
}
