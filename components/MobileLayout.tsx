'use client'
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import ThreeDotMenu from "./ThreeDotMenu";
import { motion } from "motion/react";

export default function MobileLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return <div className="p-4 block md:hidden">
        {/* Menu Button */}
        <div className="flex justify-between items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <ThreeDotMenu />
        </div>

        {/* ListView */}
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 mt-4 rounded-md border-2 border-black bg-gray-50"
            >
                <Sidebar />
            </motion.div>
        )}
        <div>
            {children}
        </div>

    </div>;
}
