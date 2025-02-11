'use client'
import Link from 'next/link'
import Tree from './Tree'
import { ArrowUpRight, House, Plus, Search, Trash2 } from 'lucide-react'

type MenuItem = {
    icon: React.ElementType;
    label: string;
    link: string;
};


const Sidebar = () => {
    const menuItems: MenuItem[] = [
        { label: 'Home', icon: House, link: '/admin/home' },
        { label: 'Search', icon: Search, link: '/admin/' },
        { label: 'New Page', icon: Plus, link: '/admin/' },
        { label: 'Trash', icon: Trash2, link: '/admin/trash' },
    ]
    return (
        <>
            <Link className='flex items-start gap-1.5 group hover:bg-gray-200 rounded-md p-1.5' href='/' target='_blank'>
                <ArrowUpRight strokeWidth={1.25} className='text-primary-color' />
                <p>Go to HomePage</p>
            </Link>
            {menuItems.map((item, index) => <Link href={item.link} key={index} className="flex items-start gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer">
                <item.icon strokeWidth={1.25} />
                <p>{item.label}</p>
            </Link>)}
            <hr className="border-t-2 border-gray-300 my-2" />
            <div className='overflow-auto'>
                <Tree />
            </div>
        </>
    )
}

export default Sidebar