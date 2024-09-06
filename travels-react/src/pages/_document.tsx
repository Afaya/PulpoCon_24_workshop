import Topbar from "@/components/topbar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Topbar></Topbar>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
