import Sidebar from "@/components/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import MobileLayout from "@/components/MobileLayout";
// import ReactQueryProvider from "@/components/ReactQueryProvider";

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
            <div className="relative">
                <ToastContainer theme="light" position="bottom-right" />

                {/* Desktop Sidebar */}
                <div className='hidden md:flex flex-col bg-gray-50 w-64 p-1.5 fixed h-screen rounded-md'>
                    <Sidebar />
                </div>

                {/* Content Area - Both Mobile & Desktop */}
                <div className="md:ml-64 min-h-screen">
                    {/* Desktop View */}
                    <div className="hidden md:block">
                        {children}
                    </div>

                    {/* Mobile View */}
                    <div className="block md:hidden">
                        <MobileLayout>
                            {children}
                        </MobileLayout>
                    </div>
                </div>
            </div>
        </body>
    </html>;
}