'use client';

import { ShapeEditor } from './editor';
import { ContextAlert } from 'components/context-alert';
import { Markdown } from 'components/markdown';
import { PageContainer } from 'components/page-container';
import { getNetlifyContext, uploadDisabled } from 'utils';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const explainer = `
[Netlify Blobs](https://docs.netlify.com/blobs/overview/) provides an object store for any kind of data, be it JSON, binary, 
or [really](https://mk.gg/projects/chalkstream) anything else ([really!](https://mk.gg/projects/turbofan)). In this example, the blob store is used to **hold the data of user-generated random blobby shapes**.

Using the blob store is basically zero-config. Below is a Next.js Server Action to upload data (see \`app/blobs/actions.js\`). 
When deployed to Netlify, the Server Action is run by serverless functions, and all context required for the blob service is set-up automatically.

~~~js
'use server';
import { getStore } from '@netlify/blobs';

// TODO: Always be sanitizing data in real sites!
export async function uploadShape({ shapeData }) {
    const blobStore = getStore('shapes');
    const key = data.name;
    await blobStore.setJSON(key, shapeData);
}
~~~

Click "Randomize" to get a shape you like, then hit "Upload".
Choose any existing object to view it.
`;

const uploadDisabledText = `
User uploads are disabled in this site. To run your own and try it out: 
<a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/next-platform-starter">
<img src="https://www.netlify.com/img/deploy/button.svg" style="display: inline;" alt="Deploy to Netlify" />
</a>
`;

export default function Page() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        // Animate title
        if (titleRef.current) {
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        }
        
        // Animate content
        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
            );
        }
        
        // Animate editor
        if (editorRef.current) {
            gsap.fromTo(editorRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1, delay: 0.6, ease: "elastic.out(1, 0.5)" }
            );
        }
    }, []);

    return (
        <PageContainer className="py-8 md:py-12" noHeaderSpacing={false}>
            <ContextAlert
                warningMessage={uploadDisabled ? uploadDisabledText : null}
                className="mb-6"
            />
            <h1 ref={titleRef} className="mb-8">Blobs x Blobs</h1>
            {!!getNetlifyContext() && (
                <>
                    <div ref={contentRef}>
                        <Markdown content={explainer} className="mb-12" />
                    </div>
                    <div ref={editorRef}>
                        <ShapeEditor />
                    </div>
                </>
            )}
        </PageContainer>
    );
}
