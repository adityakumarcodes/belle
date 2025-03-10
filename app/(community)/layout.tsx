import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
// import ReactQueryProvider from "@/components/ReactQueryProvider";

const font = Poppins({ subsets: ["latin"], weight: '300' });

//static metadata
export const metadata: Metadata = {
  title: "Belle",
  description: "Life is what you make of it so make it beautiful",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        {/* <ReactQueryProvider> */}
          <div className="mt-16">
            {children}
          </div>
        {/* </ReactQueryProvider> */}
        <Footer />
      </body>
    </html>
  );
}
