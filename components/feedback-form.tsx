'use client';

import { useState, FormEvent } from 'react';
import { Alert } from './alert';
import { Card } from './card';

type FormStatus = 'pending' | 'ok' | 'error' | null;

export function FeedbackForm() {
    const [status, setStatus] = useState<FormStatus>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setStatus('pending');
            setError(null);
            const myForm = event.target as HTMLFormElement;
            const formData = new FormData(myForm);
            
            // Convert FormData to an object that URLSearchParams can use
            const formDataObj: Record<string, string> = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value.toString();
            });
            
            const res = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formDataObj).toString()
            });
            if (res.status === 200) {
                setStatus('ok');
            } else {
                setStatus('error');
                setError(`${res.status} ${res.statusText}`);
            }
        } catch (e) {
            setStatus('error');
            setError(`${e}`);
        }
    };

    return (
        <div className="w-full md:max-w-md">
            <Card title="Leave Feedback">
                <form name="feedback" onSubmit={handleFormSubmit} className="flex flex-col gap-3 align-center" data-netlify="true">
                    <input type="hidden" name="form-name" value="feedback" />
                    <input name="name" type="text" placeholder="Name" required className="input" />
                    <input name="email" type="email" placeholder="Email (optional)" className="input" />
                    <input name="message" type="text" placeholder="Message" required className="input" />
                    <button className="btn" type="submit" disabled={status === 'pending'}>
                        Submit
                    </button>
                    {status === 'ok' && <Alert type="success">Submitted!</Alert>}
                    {status === 'error' && <Alert type="error">{error}</Alert>}
                </form>
            </Card>
        </div>
    );
}
