'use client'
import { useState, useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Pop from "./Pop";
import Button from "./Button";
import ContactMe from "./ContactMe";
import { Menu, X } from "lucide-react";
import {User} from '@supabase/supabase-js'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User|null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    return (
        <div className="fixed top-0 left-0 z-50 bg-white flex h-16 w-screen px-10 justify-between items-center border-b-2 border-neutral-950">
            <Logo />
            <div className="h-full p-2 hidden gap-2 items-center lg:flex">
                <Link href='/about' className="hover:bg-orange-200 p-2 rounded-md">About</Link>
                <Link href='/users' className="hover:bg-orange-200 p-2 rounded-md">Users</Link>
                <Link href='/blog' className="hover:bg-orange-200 p-2 rounded-md">Blog</Link>
                <ContactMe />
                {user !== null ? <Pop /> : <Link href={'/login'}><Button title='Sign In' /></Link>}
            </div>

            <div
                className="lg:hidden hover:bg-gray-200 p-2 rounded-full cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X /> : <Menu />}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-2 p-4 shadow-lg lg:hidden">
                    <Link href='/about' className="hover:bg-orange-200 p-2 rounded-md">About</Link>
                    <Link href='/users' className="hover:bg-orange-200 p-2 rounded-md">Users</Link>
                    <Link href='/blog' className="hover:bg-orange-200 p-2 rounded-md">Blog</Link>
                    <ContactMe />
                    {user !== null ? <Pop /> : <Link href={'/login'}><Button title='Sign In' /></Link>}
                </div>
            )}
        </div>
    );
}

export default Header;
