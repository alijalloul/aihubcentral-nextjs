'use client';

import Script from "next/script";

const MyHead = () => {
    return (
        <>
            {/* GOOGLE ANALYTICS TAGS */}

            {/* Google tag (gtag.js) */}
            <Script id="analytics_script1"
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-4Q5VG2FDRM"
            defer></Script>
            <Script id="analytics_script2"
            dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-4Q5VG2FDRM');
                `,
            }}
            defer></Script>

            {/* GOOGLE ADSENSE TAGS */}
            <Script id="adsense_script"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9107720851042204"
            crossorigin="anonymous"
            defer></Script>

            <Script id="BMC_script"
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id="alizjalloul"
            data-description="Support me on Buy me a coffee!"
            data-message="To support this project, buy me a coffee!"
            data-color="#5F7FFF"
            data-position="Right"
            data-x_margin="18"
            data-y_margin="18"
            defer></Script>

            <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />

            <meta
            name="description"
            content="AI Hub Central is a website that brings together multiple AI technologies, making it easy for users to explore and implement AI in their projects for free and without the need to login."
            />
            <meta
            name="keywords"
            content="AI, artificial intelligence, machine learning, deep learning, natural language processing, computer vision, AI technologies, chatbot, image generation, URL summarizer, translator, text-to-speech, speech-to-text"
            />
            <meta name="author" content="Ali Jalloul" />

            {/* Open Graph tags */}
            <meta property="og:title" content="Free AI Technologies for Everyone" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://aihubcentral.org" />
            <meta
            property="og:description"
            content="Explore our collection of free AI technologies, including chatbot, image generation, translate, and url summarization. No login required!"
            />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Free AI Technologies for Everyone" />
            <meta
            name="twitter:description"
            content="Explore our collection of free AI technologies, including chatbot, image generation, translate, and url summarization. No login required!"
            />

            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>AI Hub Central - A Platform for Multiple AI Technologies</title>

            <Script id="gsi_script" src="https://accounts.google.com/gsi/client" async defer></Script>
        </>
    );
}

export default MyHead;
