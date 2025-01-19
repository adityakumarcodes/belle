// import { supabase } from "@/lib/supabase";
import { Bodoni_Moda } from 'next/font/google'

const font = Bodoni_Moda({ subsets: ['latin'] })
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
            <h1 className={`${font.className} text-6xl`}>Hero section</h1>
        </div>

        <div style={{ backgroundImage: "linear-gradient(to left bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)" }}
            className="section">
            <p>Introduce with your</p>
            <h1 className={`${font.className} text-6xl`}>Skills</h1>
        </div>

        <div style={{ backgroundImage: "linear-gradient( 135deg, #69FF97 10%, #00E4FF 100%)" }} className="section">
            <p> List some good</p>
            <h1 className={`${font.className} text-6xl`}>Projects</h1>
        </div >
        {/* <ContactMe/>        */}        
    </div>;
}