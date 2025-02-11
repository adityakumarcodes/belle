'use client'
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { EllipsisVertical, Heart, Lock, MessageSquareText, Trash2, Undo } from "lucide-react";

export default function ThreeDotMenu() {

    const options = [
        { icon: Heart, title: 'Favourite' },
        { icon: Undo, title: 'Undo' },
        { icon: Lock, title: 'Lock' },
        { icon: MessageSquareText, title: 'Comments' },
        { icon: Trash2, title: 'Move to Trash' },
      ]

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    className="p-2 rounded-full hover:bg-gray-200 transition focus:outline-none focus:bg-gray-200"
                    aria-label="Options"
                >
                    <EllipsisVertical />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content sideOffset={8} asChild align="end">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="min-w-[150px] bg-white shadow-md rounded-md p-2 z-50"
                    >
                        {options.map((op)=>{
                            return <DropdownMenu.Item key={op.title} className="flex items-center gap-1.5 group hover:bg-gray-200 p-2 rounded-md cursor-pointer focus:outline-none focus:bg-gray-200">
                            <op.icon className="w-5 h-5 text-gray-600 group-hover:text-black" />
                            <p className="text-gray-700 group-hover:text-black select-none">{op.title}</p>
                        </DropdownMenu.Item>                        
                        })}
                    </motion.div>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
