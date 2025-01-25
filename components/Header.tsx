'use client'
import { useState, useEffect } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import MyProfile from "./MyProfile";
import Button from "./Button";
import { Menu, X } from "lucide-react";
import { User } from '@supabase/supabase-js'
import { usePathname } from "next/navigation";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [selected, setSelected] = useState<string>("");
    const pathname=usePathname();
    const navItems = [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Users", path: "/users" },
        { label: "Blog", path: "/blog" },
    ];    
    
    useEffect(() => {
        const currentPath = pathname;
        const matchedTab = navItems.find((item) => item.path === currentPath);
        setSelected(matchedTab ? matchedTab.label : "");
      }, [pathname]); 
    
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
                {navItems.map((item) => <Link key={item.label} href={item.path} className={`hover:bg-orange-200 p-2 rounded-md ${selected===item.label?'bg-orange-200':''}`} onClick={() => setSelected(item.label)}>{item.label}</Link>)}
                {user !== null ? <MyProfile /> : <Link href={'/login'}><Button title='Sign In' /></Link>}
            </div>

            <div className="lg:hidden p-2 rounded-full cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-2 p-4 shadow-lg lg:hidden">
                    {navItems.map((item) => <Link key={item.path} href={item.path} className={`hover:bg-orange-200 p-2 rounded-md ${selected===item.label?'bg-orange-200':''}`} onClick={() => {
                        setSelected(item.label);
                        setIsMenuOpen(!isMenuOpen);
                    }}>{item.label}</Link>)}
                    {user !== null ? <MyProfile /> : <Link href={'/login'}><Button title='Sign In' /></Link>}
                </div>
            )}
        </div>
    );
}

export default Header;
