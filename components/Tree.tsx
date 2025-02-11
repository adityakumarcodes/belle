'use client'
import { createClient } from "@/lib/supabase/client";
import { ChevronRight, Plus, FileText, Pin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import TextBubble from "./TextBubble";
import Skeleton from "./Skeleton";

interface FolderType {
    title: string;
    id: number;
    folders: FolderType[];
    parent_id: number | null;
}


const Tree = () => {
    // const folders: FolderType[] = [
    //     {
    //         name: 'Book1', folders: [
    //             { name: 'Movie', folders: [{ name: 'Action', folders: [{ name: '2000s', folders: [{ name: 'Hera pheri', folders: [] }, { name: 'Welcome', folders: [] }] }, { name: '2010s', folders: [] }] }, { name: 'Comedy', folders: [] }] },
    //             { name: 'Music', folders: [{ name: 'Rock', folders: [] }, { name: 'Classical', folders: [] }] },
    //             { name: 'Pics', folders: [] },
    //         ]
    //     },
    //     { name: 'Book2', folders: [{ name: 'Chapter 1', folders: [] }, { name: 'Chapter 2', folders: [] },] },
    //     { name: 'Book3', folders: [] },
    // ];
    const [folders, setFolders] = useState<FolderType[] | null>(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchFolders = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.from("notes").select("*").eq('status_flag', 'active');
            if (error) {
                console.error("Error fetching notes:", error.message);
                setLoading(false);
                return null;
            }
            setFolders(buildNestedFoldersMap(data));
            setLoading(false);
        };
        fetchFolders();
    }, []);

    // transforms a flat list of folders into a nested tree structure.
    const buildNestedFoldersMap = (flatList: FolderType[]): FolderType[] => {
        const idMap = new Map<number, FolderType>(flatList.map(folder => [folder.id, { ...folder, folders: [] }]));
        const tree: FolderType[] = [];

        flatList.forEach(folder => {
            const currentFolder = idMap.get(folder.id);
            if (!currentFolder) return;
            if (folder.parent_id === null) {
                tree.push(currentFolder);//root folder, push to tree array
            } else {
                idMap.get(folder.parent_id)?.folders.push(currentFolder);// find its parent in idMap and add it to its folders[]
            }
        });
        return tree;
    };

    const addFolder = async (parentId: number | null) => {
        const supabase = createClient();
        // If your id column is SERIAL (auto-incremented) in Supabase, you don’t need to generate an ID manually.
        // Just insert the record and let Supabase handle it.
        const newFolder = {
            title: "New Page",
            parent_id: parentId, // This makes it a child of the given folder
        };
    
        const { data, error } = await supabase.from("notes").insert([newFolder]).select("*");
        if (error) {
            console.error("Error adding folder:", error.message);
            return;
        }
    
        // Update state locally without refetching from the database
        setFolders(prevFolders => {
            if (!prevFolders) return null;
            const updatedFolders = [...prevFolders];
    
            // Helper function to find and add the new folder in the right place
            const insertIntoTree = (folders: FolderType[]): FolderType[] => {
                return folders.map(folder => {
                    if (folder.id === parentId) {
                        return { ...folder, folders: [...folder.folders, data[0]] };
                    } else if (folder.folders.length > 0) {
                        return { ...folder, folders: insertIntoTree(folder.folders) };
                    }
                    return folder;
                });
            };
    
            return parentId === null
                ? [...updatedFolders, data[0]]
                : insertIntoTree(updatedFolders);
        });
    };
    

    return <ul>
        {loading?<Skeleton count={7}/>:folders?.map(folder => (
            <Folder key={folder.id} folder={folder} addFolder={addFolder}/>
        ))}
    </ul>;
}

interface FolderProps {
    folder: FolderType;
    addFolder: (parentId: number | null) => void;
}

const Folder = ({ folder,addFolder }: FolderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return <li className="ml-2" key={folder.title}>
        <span className={`flex items-start justify-between group hover:bg-gray-200 rounded-md ${isOpen ? 'bg-gray-200' : ''}`}>
            <div className="flex gap-1.5 items-center">
                <ChevronRight strokeWidth={1.25} onClick={() => setIsOpen(!isOpen)} className={`ml-1 transition-transform duration-200 group-hover:inline hidden m-1 text-gray-500 hover:bg-gray-300 rounded-md ${isOpen ? 'rotate-90' : ''}`} />
                {folder.folders && folder.folders.length === 0 ? <FileText strokeWidth={1.25} className="text-gray-500 inline group-hover:hidden ml-2 w-6 h-6 " /> : <p className="ml-2 w-6 h-6 inline group-hover:hidden">🧠</p>}
                <Link href={`/admin/notes/${folder.id}`}>
                    <p className="line-clamp-1 select-none">{folder.title}</p>
                </Link>
            </div>
            <div className="flex ">
                <TextBubble msg="Pin" dir={"bottom"}>
                    <Pin strokeWidth={1.5} className={`group-hover:opacity-100 opacity-0 m-1 text-gray-500 hover:bg-gray-300 rounded-md`} />
                </TextBubble>
                <TextBubble msg="Add a page inside" dir={"bottom"}>
                    <Plus strokeWidth={1.5} className={`group-hover:opacity-100 opacity-0 m-1 text-gray-500 hover:bg-gray-300 rounded-md`}         onClick={() => addFolder(folder.id)}/>
                </TextBubble>
            </div>
        </span>
        {isOpen && folder.folders && folder.folders.length === 0 && <p className="text-gray-400 ml-6">No pages inside</p>}
        {isOpen && <ul>{folder.folders?.map(subFolder => <Folder folder={subFolder} key={subFolder.title} addFolder={addFolder}/>)}</ul>}
    </li>;
}

export default Tree;
