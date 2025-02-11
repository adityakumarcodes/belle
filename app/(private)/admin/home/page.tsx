'use client'
import { Bolt, CloudUpload, Feather, Maximize, Minimize, Trash2, VenetianMask } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react';

const Home = () => {
    const options = [
        { label: 'Secrets', icon: VenetianMask, link: '/admin/' },
        { label: 'Backup', icon: CloudUpload, link: '/admin/' },
        { label: 'Blogs', icon: Feather, link: '/admin/' },
        { label: 'Settings', icon: Bolt, link: '/admin/' },
        { label: 'Trash', icon: Trash2, link: '/admin/home/trash' },
    ]
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false));
        }
    };

    return <div className='flex p-2 flex-wrap'>
            {options.map((op) => {
                return <Link key={op.label} href={op.link} className="flex m-2 items-start gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer">
                    <op.icon strokeWidth={1.25} />
                    <p>{op.label}</p>
                </Link>
            })}
        <button onClick={toggleFullscreen} className="p-2">
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
    </div >
}

export default Home