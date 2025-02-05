'use client'
import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Link from "next/link";
import ToggleTheme from "./ToggleTheme";
import { signOut } from '@/app/(community)/login/actions'
import { useEffect, useState } from 'react'
import { createClient } from "@/lib/supabase/client";
import { User } from '@supabase/supabase-js';

const MyProfile = () => {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState<User | null>(null)
    const handleLinkClick = () => {
        setOpen(false); // Close the popover when a link is clicked
    };
    const userData = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setCurrent(user);
    }
    useEffect(() => {
        userData();
    }, [])
    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger >
                <Image className='mx-auto border border-white rounded-full' src={assets.profile_icon} width={40} height={40} alt={''} />
            </Popover.Trigger >
            <Popover.Anchor />
            <Popover.Portal>
                <Popover.Content className="absolute top-[50px] right-0 bg-white border border-gray-300 shadow-md rounded-md p-4 z-60 min-w-56">
                    <ToggleTheme />
                    <Link href='/admin/home' onClick={handleLinkClick}><h2 className="hover:underline hover:decoration-2 py-2">Go to admin</h2></Link>
                    <form action={signOut} className="flex-col items-center pt-4">
                        <p>{current ? current.email : 'Loading...'}</p>
                        <button className="btn">Signout</button>
                    </form>
                    <Popover.Close className="absolute top-2 right-2">
                        ✖
                    </Popover.Close>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default MyProfile