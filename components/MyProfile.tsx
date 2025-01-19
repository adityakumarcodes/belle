'use client'
import { signOut } from '@/app/login/actions'
import { useEffect, useState } from 'react'
import { createClient } from "@/lib/supabase/client";
import { User } from '@supabase/supabase-js';

const MyProfile = () => {
    const [current, setCurrent] = useState<User|null>(null)
    const userData = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setCurrent(user);
    }
    useEffect(() => {
        userData();
    }, [])

    return <form action={signOut} className="flex-col items-center pt-4">
        <p>{current ? current.email : 'Loading...'}</p>
        <button className="btn">Signout</button>
    </form>
}

export default MyProfile