import Sidebar from "@/components/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";

const font = Poppins({ subsets: ["latin"], weight: '300' });

export const metadata: Metadata = {
    title: "Belle",
    description: "Life is what you make of it so make it beautiful",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <html lang="en">
        <body className={font.className}>
            <div className="flex">
                <ToastContainer theme="light" position="bottom-right" />
                <Sidebar />
                {children}
            </div>
        </body>
    </html>;
}

