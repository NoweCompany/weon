import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `if (!('noModule' in HTMLScriptElement.prototype)) {
                        const script = document.createElement('script');
                        script.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
                        document.body.appendChild(script);
                      }`,
          }}
        />
      </body>
    </Html>
  );
}
