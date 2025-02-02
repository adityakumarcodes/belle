<<<<<<< HEAD
// import { supabase } from "@/lib/supabase";

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
            <h1 className="text-4xl p-4">I am a developer focusing on building delightful experience for the web.</h1>
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
=======
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
>>>>>>> 72d85aa (Initial commit from Create Next App)
