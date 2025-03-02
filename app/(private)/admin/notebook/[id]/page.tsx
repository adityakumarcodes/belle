'use client'
import dynamic from 'next/dynamic';
const MyTextEditor = dynamic(() => import("@/components/MyTextEditor"), { ssr: false });
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { redirect, useParams } from 'next/navigation';
import { OutputData } from '@editorjs/editorjs';
import { MessageSquareText } from 'lucide-react';
import { Heart, Trash2, Lock } from 'lucide-react';

const NoteDetails = () => {
  const params = useParams();
  const id = params?.id ?? "";
  const [data, setData] = useState<OutputData>({ blocks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const options = [
    { icon: Heart, title: 'Favourite' },
    { icon: Lock, title: 'Lock' },
    { icon: Trash2, title: 'Trash', onClick: () => deleteNote(Number(id)) },
    { icon: MessageSquareText, title: 'Feedback' },
  ]
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

  const deleteNote = async (id: number) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('notes')
      .update({ status_flag: 'expired' })
      .eq('id', id);

    if (error) {
      console.error("Error restoring item:", error.message);
    } else {
      console.log(`Note deleted successfully ${id}`);
      redirect('/admin/trash');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='flex flex-col h-screen overflow-y-scroll'>
      <div className='m-2 flex items-center justify-between'>
        <div className='flex space-x-4 ml-6 flex-wrap gap-3 mt-2'>
          {options.map((op) => (
            <span
              className='flex items-center gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer'
              key={op.title}
              onClick={op.onClick}
            >
              <op.icon className="w-5 h-5 text-gray-600 group-hover:text-black" />
              <p>{op.title}</p>
            </span>
          ))}
        </div>
      </div>
      <MyTextEditor initialData={data} id={Number(id)} />
    </div>
  )
}

export default NoteDetails



// https://assets-global.website-files.com/632c2ca7090891667181cf26/6357c4fd5250b4baf26e7460_Rich%20text-transcode.mp4
