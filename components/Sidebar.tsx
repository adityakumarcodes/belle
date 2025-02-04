'use client'
import Link from 'next/link'
import Tree from './Tree'
import { ArrowUpRight, CloudUpload, FilePlus, House, Lock, LockKeyhole, Search, Trash2 } from 'lucide-react'

type MenuItem = {
    icon: React.ElementType;
    label: string;
};


const Sidebar = () => {
    const menuItems: MenuItem[] = [
        { label: 'Home', icon: House },
        { label: 'Search', icon: Search },
        { label: 'Locked Pages', icon: Lock },
        { label: 'Backup', icon: CloudUpload },
        { label: 'Trash', icon: Trash2 },
        { label: 'New Page', icon: FilePlus },
    ]
    return (
        <div className='flex flex-col bg-gray-50'>
            <div className='w-64 h-[100vh] p-2'>
                {/* <Link href={'/admin/addProduct'} className='flex  items-center border  border-black  gap-3 font-medium p-3 bg-white '>
                        <Image src={assets.add_icon} alt={''} width={28} /><p>Add blogs</p>
                    </Link> */}
                {/* <Link href={'/admin/blogList'} className='mt-5 flex items-center border  border-black  gap-3 font-medium p-3 bg-white '>
                        <Image src={assets.blog_icon} alt={''} width={28} /><p>Blog lists</p>
                    </Link> */}
                <Link className='flex items-start gap-1.5 group hover:bg-gray-200 rounded-md m-1 p-2' href='/' target='_blank'>
                    <ArrowUpRight strokeWidth={1.25} className='text-primary-color' />
                    <p>Go to HomePage</p>
                </Link>                    
                {menuItems.map((item, index) => <span key={index} className="flex items-start gap-1.5 group hover:bg-gray-200 rounded-md m-1 p-2 cursor-pointer">
                    <item.icon strokeWidth={1.25} />
                    <p>{item.label}</p>
                </span>)}
                <hr className="border-t-2 border-gray-300 my-2" />
                <Tree />
            </div>
        </div>
    )
}

export default Sidebar