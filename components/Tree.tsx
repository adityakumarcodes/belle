'use client'
import { createClient } from "@/lib/supabase/client";
import * as  Tooltip from "@radix-ui/react-tooltip";
import { ChevronRight, Plus, FileText, Pin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tooltipp from "./Tooltipp";

interface FolderType {
    name: string;
    id: number;
    folders?: FolderType[];
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

    useEffect(() => {
        const fetchFolders = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.from("notes").select("id,title");
            if (error) {
                console.error("Error fetching notes:", error.message);
                return null;
            }
            const mappedFolders: FolderType[] = (data || []).map((x) => ({
                name: x.title,
                id: x.id.toString(),
                folders: [],
            }));
            setFolders(mappedFolders);
        };
        fetchFolders();
    }, []);

    return <ul>
        {folders?.map(folder => (
            <Folder key={folder.name} folder={folder} />
        ))}
    </ul>;
}

interface FolderProps {
    folder: FolderType;
}

const Folder = ({ folder }: FolderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return <li className="ml-2" key={folder.name}>
        <span className={`flex items-start justify-between group hover:bg-gray-200 rounded-md ${isOpen ? 'bg-gray-200' : ''}`}>
            <div className="flex gap-1.5 items-center">
                <ChevronRight strokeWidth={1.25} onClick={() => setIsOpen(!isOpen)} className={`ml-1 transition-transform duration-200 group-hover:inline hidden m-1 text-gray-500 hover:bg-gray-300 rounded-md ${isOpen ? 'rotate-90' : ''}`} />
                {folder.folders && folder.folders.length === 0 ? <FileText strokeWidth={1.25} className="text-gray-500 inline group-hover:hidden ml-2 w-6 h-6 " /> : <p className="ml-2 w-6 h-6 inline group-hover:hidden">🧠</p>}
                <Link href={`/admin/notes/${folder.id}`}>
                    <p className="line-clamp-1 select-none">{folder.name}</p>
                </Link>
            </div>
            <div className="flex ">
                <Tooltipp msg="Pin" dir={"bottom"}>
                    <Pin strokeWidth={1.5} className={`group-hover:opacity-100 opacity-0 m-1 text-gray-500 hover:bg-gray-300 rounded-md`} />
                </Tooltipp>
                <Tooltipp msg="Add a page inside" dir={"bottom"}>
                    <Plus strokeWidth={1.5} className={`group-hover:opacity-100 opacity-0 m-1 text-gray-500 hover:bg-gray-300 rounded-md`} />
                </Tooltipp>
            </div>
        </span>
        {isOpen && folder.folders && folder.folders.length === 0 && <p className="text-gray-400 ml-6">No pages inside</p>}
        {isOpen && <ul>{folder.folders?.map(subFolder => <Folder folder={subFolder} key={subFolder.name} />)}</ul>}
    </li>;
}

export default Tree;
