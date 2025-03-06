import Sidebar from "@/components/Sidebar";
import { ToastContainer } from 'react-toastify';
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
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    theme="light"
                />
                {/* Desktop Sidebar */}
                <div className='hidden md:flex flex-col bg-gray-50 w-56 p-1.5 fixed h-screen rounded-md'>
                    <Sidebar />
                </div>

                {/* Content Area - Both Mobile & Desktop */}
                <>
                    {/* Desktop View */}
                    <div className="hidden md:block md:ml-56 min-h-screen">
                        {children}
                    </div>

                    {/* Mobile View */}
                    <MobileLayout>
                        {children}
                    </MobileLayout>
                </>
            </div>
        </body>
    </html>;
}