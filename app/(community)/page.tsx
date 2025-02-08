// import { supabase } from "@/lib/supabase";

import { Variants } from "motion/react";
import * as motion from "motion/react-client"

const fadeInUpAnimation: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
        filter: 'blur(5px)'
    },
    show: {
        opacity: 1,
        y: -50,
        transition: {duration: 1},
        filter: 'blur(0px)'
    },
};


export default function Home() {
    // const addTodo= async ()=>{
    //     const {data,error}=await supabase.from('todo').insert({task:'Complete your portfolio'}).select()
    //     console.log(data?data:error)
    // }
    // addTodo();

    // no RLS - yes (any one can insert)

    // anon in env
    // RLS enabled for auth role - no                                                    
    // RLS enabled for anon role - yes (Supabase client will by default returns null on inserting the data, otherwise create the select RLS policy to get the inserted record)
    // RLS enabled for service role - no        

    // service role key in env        
    // RLS enabled for anon role - yes 
    // RLS enabled for service role - yes

    return <div>
        <div className="section" style={{ backgroundImage: "linear-gradient( 135deg, #FFF886 10%, #F072B6 100%)" }}>
            <motion.h1 initial={"hidden"} animate={'show'} variants={fadeInUpAnimation} className="p-4 text-balance">Building delightful experience for web</motion.h1>
        </div>
        <div style={{ backgroundImage: "linear-gradient(to left bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)" }}
            className="section">
            <p>Introduce with your</p>
            <h1 className="text-6xl">Skills</h1>
        </div>

        <div style={{ backgroundImage: "linear-gradient( 135deg, #69FF97 10%, #00E4FF 100%)" }} className="section">
            <p> List some good</p>
            <h1 className="text-6xl">Projects</h1>
        </div >
    </div>;
}
// Blur in Nextjs
// Static
// const buffer = await fs.readFile('./public/1734160913868_blog_pic_1.png')
// const { color } = await getPlaiceholder(buffer)
// const { base64 } = await getPlaiceholder(buffer)
// Usege
// {/* <Image src={img} alt='' placeholder='blur' width={400} />static import */}
// {/* <Image src={img} alt='' placeholder='blur' width={400} blurDataURL={base64} />static placiholder */}
// {/* <Image src={img} alt='' width={400} style={{ backgroundColor: color.hex }} />color from img */}

// Dynamic
// const bufferD = await fetch('https://images.unsplash.com/photo-1727206407683-490abfe0d682?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8').then(async (res) => { return Buffer.from(await res.arrayBuffer()) })
// const { base64 } = await getPlaiceholder(bufferD)
// const { color } = await getPlaiceholder(bufferD)
// <Image src={src} alt='' placeholder='blur' height={ht} width={wt} blurDataURL={base64} />
