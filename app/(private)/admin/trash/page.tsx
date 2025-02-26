'use client'
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
        } else {
            // Refresh the list after restoration
            setTrashData(trashData?.filter(item => item.id !== id) || null);
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

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <div className="flex justify-center">
                    Loading...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {trashData?.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-200 cursor-pointer">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium">{item.title}</h4>
                                <button
                                    onClick={() => restoreItem(item.id)}
                                    className="p-2 hover:bg-gray-300 rounded-full"
                                    title="Restore Item"
                                >
                                    <Undo2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrashPage