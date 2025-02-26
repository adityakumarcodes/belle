'use client'
import Link from 'next/link'
import Tree from './Tree'
import { BookOpen, HardDrive, House, Plus, Search, Trash2, ChevronDown, Bolt } from 'lucide-react'
import { useState } from 'react'
import HoverText from './HoverText'

type MenuItem = {
    icon: React.ElementType;
    label: string;
    link: string;
    isAccordion?: boolean;
};


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems: MenuItem[] = [
        { label: 'Home', icon: House, link: '/admin/home' },
        { label: 'Search', icon: Search, link: '/admin/' },
        { label: 'My Files', icon: HardDrive, link: '/admin/' },
        {
            label: 'Notes',
            icon: BookOpen,
            link: '/admin/',
            isAccordion: true,
        }
    ]

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        {item.isAccordion ? (
                            <div>
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-start gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer"
                                >
                                    <item.icon strokeWidth={1.25} />
                                    <p className="flex-grow">{item.label}</p>
                                    <HoverText msg="Add new page" dir={"bottom"}>
                                        <Plus strokeWidth={1.5} className={`group-hover:opacity-100 opacity-0 text-gray-500 hover:bg-gray-300 rounded-md`} />
                                    </HoverText>
                                    <ChevronDown strokeWidth={1.25} onClick={() => setIsOpen(!isOpen)} className={`transition-transform duration-200 group-hover:inline text-gray-500 hover:bg-gray-300 rounded-md ${isOpen ? 'rotate-180' : ''}`} />
                                </div>
                                {isOpen && (
                                    <div className="ml-2">
                                        <Tree />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href={item.link} className="flex items-start gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer">
                                <item.icon strokeWidth={1.25} />
                                <p>{item.label}</p>
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-auto pb-4 ">
                <hr className="border-t-2 border-gray-300 my-2" />
                <Link href="/admin/" className="flex items-start gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer">
                    <Bolt strokeWidth={1.25} />
                    <p>Settings</p>
                </Link>
                <Link href="/admin/trash" className="flex items-start gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer">
                    <Trash2 strokeWidth={1.25} />
                    <p>Trash</p>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar