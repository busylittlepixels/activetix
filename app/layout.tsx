import '../styles/globals.css';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

export const metadata = {
    title: {
        template: '%s | ActiveTix',
        default: 'ActiveTix - Modern Web Experiences'
    }
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="antialiased text-white bg-black">
                <div className="flex flex-col min-h-screen bg-noise">
                    <Header />
                    <main className="grow">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
