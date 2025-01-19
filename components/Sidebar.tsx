'use client'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import Link from 'next/link'

const Sidebar = () => {
    return (
        <div className='flex flex-col bg-slate-100'>
            <div className='w-28 sm:w-80 h-[100vh] relative py-12 '>
                <div className='flex-col justify-center w-[50%] sm:w-[80%] absolute '>
                    <Link href={'/admin/addProduct'} className='flex  items-center border  border-black  gap-3 font-medium p-3 bg-white '>
                        <Image src={assets.add_icon} alt={''} width={28} /><p>Add blogs</p>
                    </Link>
                    <Link href={'/admin/blogList'} className='mt-5 flex  items-center border  border-black  gap-3 font-medium p-3 bg-white '>
                        <Image src={assets.blog_icon} alt={''} width={28} /><p>Blog lists</p>
                    </Link>
                    <Link href={'/admin/subscriptions'} className='mt-5 flex  items-center border  border-black  gap-3 font-medium p-3 bg-white '>
                        <Image src={assets.email_icon} alt={''} width={28} />
                        <p>Subscriptions</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar