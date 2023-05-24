import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* GOOGLE ANALYTICS TAGS */}

          {/* Google tag (gtag.js) */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-4Q5VG2FDRM"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-4Q5VG2FDRM');
              `,
            }}
          ></script>

          {/* GOOGLE ADSENSE TAGS */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9107720851042204"
            crossorigin="anonymous"
          ></script>

          <script
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
          ></script>

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

          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>AI Hub Central - A Platform for Multiple AI Technologies</title>

          <script src="https://accounts.google.com/gsi/client" async defer></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
