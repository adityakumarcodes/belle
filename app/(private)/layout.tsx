import Sidebar from "@/components/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import MobileLayout from "@/components/MobileLayout";

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
            <div>
                <ToastContainer theme="light" position="bottom-right" />
                {/* Desktop */}
                <div className="hidden md:block">
                    <div className='flex flex-col bg-gray-50 w-64 p-1.5 fixed h-screen rounded-md'>
                        <Sidebar />
                    </div>
                    <div className="ml-64">
                        {children}
                    </div>
                </div>
                {/* Mobile */}
                <MobileLayout>
                    {children}
                </MobileLayout>
            </div>
        </body>
    </html>;
}

