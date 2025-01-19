import BlogList from "@/components/BlogList";
import { Bodoni_Moda } from 'next/font/google'
 
const font = Bodoni_Moda({ subsets: ['latin'] })
export default function BlogPage() {

    return (
        <div className="p-4">
            <div className="text-center my-8">
                <h1 className={`${font.className} text-6xl`}>Latest blogs</h1>
                <form className="flex justify-between max-w-[500px] border border-black mx-auto mt-10 shadow-[-7px_7px_0px_#000000]">
                    <input type="email" name="" id="" placeholder="Enter you email" className="pl-4 outline-none"/>
                    <button type="submit" className="border-l border-black p-4 hover:bg-gray-500 hover:text-white">Subscribe</button>
                </form>
            </div>
            <BlogList/>
        </div>
    )
}