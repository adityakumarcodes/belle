import { ChevronRight, File, Folder as FD, FolderOpen, MoreVertical } from "lucide-react";
import { useState } from "react";

interface FolderType {
    name: string;
    folders?: FolderType[];
}

const Tree = () => {
    const folders: FolderType[] = [
        {
            name: 'Home', folders: [
                { name: 'Movie', folders: [{ name: 'Action', folders: [{ name: '2000s', folders: [{ name: 'Hera pheri.mp4' }, { name: 'Welcome.mp4' }] }, { name: '2010s', folders: [] }] }, { name: 'Comedy', folders: [] }] },
                { name: 'Music', folders: [{ name: 'Rock', folders: [] }, { name: 'Classical', folders: [] }] },
                { name: 'Pics', folders: [] },
                // { name: 'passwords.txt' }
            ]
        },
    ];

    return <div>
        <ul className="pl-6">
            {folders.map(folder => (
                <Folder folder={folder} key={folder.name} />
            ))}
        </ul>
    </div>;
}

interface FolderProps {
    folder: FolderType;
}

const Folder = ({ folder }: FolderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return <li className="flex flex-col items-start my-1.5" key={folder.name}>
        <span className={`flex items-start gap-1.5 group hover:bg-gray-200 rounded-md ${isOpen ? 'bg-gray-200' : ''}`}>
            {folder.folders &&
                <button onClick={() => setIsOpen(!isOpen)} className={`group-hover:opacity-100 opacity-0 m-1 ${isOpen ? 'opacity-100' : ''}`}>
                    <ChevronRight strokeWidth={1.5} className={`text-gray-500 hover:bg-gray-300 rounded-md ${isOpen ? 'rotate-90' : ''}`} />
                </button>}
            {folder.folders ?
                isOpen ?
                    <FolderOpen strokeWidth={1.25} className={`text-primary-color `} /> :
                    <FD strokeWidth={1.25} className={`text-primary-color `} /> :
                <File className="ml-7 text-gray-900" />
            }
            <p>{folder.name}</p>
        </span>
        {isOpen && folder.folders && folder.folders.length === 0 && <p className="p-1">No pages inside</p>}
        {isOpen && <ul className="ml-7">
            {folder.folders?.map(subFolder => (
                <Folder folder={subFolder} key={subFolder.name} />
            ))}
        </ul>}
    </li>;
}

export default Tree;
