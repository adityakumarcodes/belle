import BlogList from "@/components/BlogList";
import { Bodoni_Moda } from 'next/font/google'
 
const font = Bodoni_Moda({ subsets: ['latin'] })
export default function BlogPage() {

    return (
        <div className="p-4">
            <div className="text-center my-8">
                <h1 className={`${font.className} text-6xl`}>Latest blogs</h1>
                <form className="flex justify-between max-w-[420px] border border-black mx-auto mt-10 shadow-[-7px_7px_0px_#000000]">
                    <input type="email" name="" id="" placeholder="Enter you email" className="pl-2 lg:pl-4 outline-none"/>
                    <button type="submit" className="border-l border-black p-2 lg:p-4 hover:bg-orange-200">OK</button>
                </form>
            </div>
            <BlogList/>
        </div>
    )
}