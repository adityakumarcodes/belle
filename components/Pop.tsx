'use client'
import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useState } from 'react'
import Link from "next/link";
import MyProfile from "./MyProfile";
import ToggleTheme from "./ToggleTheme";

const Pop = () => {
    const [open, setOpen] = useState(false);
    const handleLinkClick = () => {
        setOpen(false); // Close the popover when a link is clicked
    };
    
    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger >
                <Image className='mx-auto border border-white rounded-full' src={assets.profile_icon} width={40} height={40} alt={''} />
            </Popover.Trigger >
            <Popover.Anchor />
            <Popover.Portal>
                <Popover.Content className="absolute top-[50px] right-0 bg-white border border-gray-300 shadow-md rounded-md p-4 z-60 min-w-56">
                    <ToggleTheme/>
                    <Link href='/admin' onClick={handleLinkClick}><h2 className="hover:underline hover:decoration-2 py-2">Go to admin</h2></Link>
                    <MyProfile/>
                    <Popover.Close className="absolute top-2 right-2">
                        ✖
                    </Popover.Close>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default Pop