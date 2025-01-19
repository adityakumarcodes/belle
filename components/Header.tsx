import Logo from "./Logo";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Pop from "./Pop";
import Button from "./Button";
import ContactMe from "./ContactMe";

const Header = async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    return (
        <div className="fixed top-0 left-0 z-50 bg-white flex h-16 w-screen px-10 justify-between items-center border-b-2 border-neutral-950">
            <Logo />
            <div className="h-full p-2 flex gap-2 items-center ">
                <Link href='/about' className="hover:bg-orange-200 p-2 rounded-md">About</Link>
                <Link href='/users' className="hover:bg-orange-200 p-2 rounded-md">Users</Link>
                <Link href='/blog' className="hover:bg-orange-200 p-2 rounded-md">Blog</Link>
                <ContactMe/>                    
                {user !== null ? (
                    <Pop/>
                ) : <Link href={'/login'}><Button title='Sign In' /></Link>}
            </div>
        </div>
    );
}

export default Header;