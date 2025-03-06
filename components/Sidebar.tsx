'use client'
import Link from 'next/link'
import Tree from './Tree'
import { BookOpen, House, Plus, Search, Trash2, ChevronDown, Bolt, HardDrive, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import HoverText from './HoverText'

type BaseMenuItem = {
    icon: React.ElementType;
    label: string;
};

type LinkMenuItem = BaseMenuItem & {
    type: 'link';
    link: string;
};

type AccordionMenuItem = BaseMenuItem & {
    type: 'accordion';
};

type MenuItem = LinkMenuItem | AccordionMenuItem;

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems: MenuItem[] = [
        { type: 'link', label: 'Home', icon: House, link: '/admin/home' },
        { type: 'link', label: 'Search', icon: Search, link: '/admin/search' },
        { type: 'link', label: 'My Drive', icon: HardDrive, link: '/admin/mydrive' },
        { type: 'accordion', label: 'Notebook', icon: BookOpen },
    ]

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        {item.type === 'accordion' ? (
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
                <Link href="/" target="_blank" className="flex items-start gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer">
                    <ArrowUpRight strokeWidth={1.25} />
                    <p>Go to Home</p>
                </Link>
                <Link href="/admin/settings" className="flex items-start gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer">
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