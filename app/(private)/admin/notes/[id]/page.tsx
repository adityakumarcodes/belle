'use client'
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });
import { Heart, Lock, MessageSquareText, Pin, Save, Smile, Trash2, Undo } from 'lucide-react'
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';
import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';

const NoteDetails = () => {
  const params = useParams();
  const id = params?.id ?? "";
  const [data, setData] = useState<OutputData>({ blocks: []});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const options = [
    { icon: Smile, title: 'Add icon' },
    { icon: Heart, title: 'Favourite' },
    { icon: Undo, title: 'Undo' },
    { icon: Lock, title: 'Lock' },
    { icon: Pin, title: 'Pin' },
    { icon: MessageSquareText, title: 'Comments' },
    { icon: Trash2, title: 'Trash' },
  ]

  const handleSave = (data: OutputData) => {
    console.log("Editor Data:", data);
  };

  useEffect(() => {
    if(!id) return ;

    const fetchNoteDetails = async () => {
      
      setLoading(true);
      console.log("Fetching note with id:", id);
      const supabase = createClient();
      const { data, error } = await supabase.from("notes").select("long_desc").eq('id',id).single();
      if (error) {
        console.error("Error fetching notes:", error.message);
        setError(error.message);
        return null;
      }
      console.log("Fetched data:", data);
      setData(data?.long_desc || { blocks: [] }); 
      setLoading(false); 
    };
    fetchNoteDetails();
  }, [id]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; 

  return (
    <div className='flex flex-col h-screen overflow-y-scroll'>
      <div className='m-2 flex items-center justify-between'>
        {/* <nav className="text-gray-600 text-sm">
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
        </nav> */}
        <div className='flex space-x-4 ml-6'>
          {options.map((op) => (
            <span
              className='flex items-center gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer'
              key={op.title}
            >
              <op.icon className="w-5 h-5 text-gray-600 group-hover:text-black" />
              <p className="text-gray-700 group-hover:text-black select-none">{op.title}</p>
            </span>
          ))}
        </div>
      </div>
      <Editor onSave={handleSave} initialData={data} id={Number(id)}/>
    </div>
  )
}

export default NoteDetails



// https://assets-global.website-files.com/632c2ca7090891667181cf26/6357c4fd5250b4baf26e7460_Rich%20text-transcode.mp4
