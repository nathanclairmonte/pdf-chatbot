import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-6JX8DPX0HF"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-6JX8DPX0HF', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />;
            </SessionProvider>
            <Analytics />
        </>
    );
}
