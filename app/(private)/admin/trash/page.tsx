'use client'
import TextBubble from '@/components/TextBubble';
import { createClient } from '@/lib/supabase/client';
import { Undo2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FolderType {
    title: string;
    id: number;
    folders: FolderType[]; // parent ID is null for root folder
    parent_id: number | null;
}

const TrashPage = () => {
    const [trashData, setTrashData] = useState<FolderType[] | null>(null);
    const [loading, setLoading] = useState(true);

    const restoreItem = async (id: number) => {
        const supabase = createClient();
        const { error } = await supabase
            .from('notes')
            .update({ status_flag: 'active' })
            .eq('id', id);

        if (error) {
            console.error("Error restoring item:", error.message);
        }
    };
    useEffect(() => {
        const fetchDeletedItems = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.from('notes').select('*').eq('status_flag', 'expired');
            if (error) {
                console.error("Error fetching deleted items:", error.message);
            }
            setTrashData(data);
            setLoading(false);
        };
        fetchDeletedItems();
    }, [])

    return <div className="m-2 p-2">
        {loading ? <h3>Loading...</h3> : trashData?.map((a) => (
            <div key={a.id} className='flex justify-center border-2 border-black rounded-md p-2 hover:bg-gray-200 m-2'>
                <div>{JSON.stringify(a,null, 2)}</div>
                <TextBubble msg="Restore" dir={"bottom"}>
                    <Undo2 className='opacity-100 m-1 text-gray-500 hover:bg-gray-300 rounded-md' onClick={()=>restoreItem(a.id)}/>
                </TextBubble>
            </div>
        ))}
    </div>;
}

export default TrashPage