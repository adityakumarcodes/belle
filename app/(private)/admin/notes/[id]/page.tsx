'use client'
import dynamic from 'next/dynamic';
const MyTextEditor = dynamic(() => import("@/components/MyTextEditor"), { ssr: false });
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';
import { OutputData } from '@editorjs/editorjs';
import ThreeDotMenu from '@/components/ThreeDotMenu';

const NoteDetails = () => {
  const params = useParams();
  const id = params?.id ?? "";
  const [data, setData] = useState<OutputData>({ blocks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchNoteDetails = async () => {
      setLoading(true);
      console.log("Fetching note with id:", id);
      const supabase = createClient();
      const { data, error } = await supabase.from("notes").select("content,title").eq('id', id).single();
      if (error) {
        console.error("Error fetching notes:", error.message);
        setError(error.message);
        return null;
      }
      // console.log("Fetched data:", data);
      setData(data?.content || { blocks: [] });
      if (data?.title) {
        document.title = data.title;
      }
      setLoading(false);
    };
    fetchNoteDetails();
  }, [id]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='flex flex-col h-screen overflow-y-scroll'>
      <div className='m-2 md:flex items-center justify-between hidden'>
        <nav className="text-gray-600 text-sm">
          <ol className="list-reset flex">
            <li>
              <a href="#" className="hover:underline">Home</a>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li>
              <a href="#" className="hover:underline">Category</a>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-500">Current Page</li>
          </ol>
        </nav>
        <ThreeDotMenu />
      </div>
      <MyTextEditor initialData={data} id={Number(id)} />
    </div>
  )
}

export default NoteDetails



// https://assets-global.website-files.com/632c2ca7090891667181cf26/6357c4fd5250b4baf26e7460_Rich%20text-transcode.mp4
