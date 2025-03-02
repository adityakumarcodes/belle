'use client'
import { FileUp, FolderPlus, FolderUp, LayoutGrid, LayoutList, Search, ChevronRight } from 'lucide-react';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface BaseItem {
    id: number;
    type: 'file' | 'folder';
    name: string;
    color: string;
    hoverColor: string;
}

interface FolderItem extends BaseItem {
    type: 'folder';
}

interface FileItem extends BaseItem {
    type: 'file';
    extension: string;
}

type DriveItem = FolderItem | FileItem;

const DrivePage = () => {
    const myFiles: DriveItem[] = [
        { id: 1, type: 'folder', name: "Documents", color: "bg-orange-300", hoverColor: "hover:bg-orange-100" },
        { id: 2, type: 'folder', name: "Images", color: "bg-blue-300", hoverColor: "hover:bg-blue-100" },
        { id: 3, type: 'folder', name: "Videos", color: "bg-green-300", hoverColor: "hover:bg-green-100" },
        { id: 4, type: 'folder', name: "Downloads", color: "bg-red-300", hoverColor: "hover:bg-red-100" },
        { id: 5, type: 'file', name: "Report.pdf", extension: "pdf", color: "bg-red-300", hoverColor: "hover:bg-red-100" },
        { id: 6, type: 'file', name: "Presentation.ppt", extension: "ppt", color: "bg-yellow-300", hoverColor: "hover:bg-yellow-100" },
        { id: 7, type: 'file', name: "Budget.xls", extension: "xls", color: "bg-green-300", hoverColor: "hover:bg-green-100" },
    ];

    const sharedItems: DriveItem[] = [
        { id: 8, type: 'folder', name: "Shared Project", color: "bg-violet-300", hoverColor: "hover:bg-violet-100" },
        { id: 9, type: 'file', name: "Team Notes.doc", extension: "doc", color: "bg-blue-300", hoverColor: "hover:bg-blue-100" },
    ];

    const recentItems: DriveItem[] = [
        { id: 11, type: 'file', name: "Roadmap.pdf", extension: "pdf", color: "bg-red-300", hoverColor: "hover:bg-red-100" },
        { id: 12, type: 'file', name: "Recent Doc.pdf", extension: "pdf", color: "bg-red-300", hoverColor: "hover:bg-red-100" },
    ];

    const actionButtons = [
        { id: 'new-folder', label: 'New Folder', icon: FolderPlus },
        { id: 'upload-file', label: 'File upload', icon: FileUp },
        { id: 'upload-folder', label: 'Folder upload', icon: FolderUp },
    ];

    const [isGridLayout, setIsGridLayout] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');

    // Update visibleSections state to remove separate folders and files sections
    const [visibleSections, setVisibleSections] = React.useState({
        myFiles: true,
        shared: true,
        favourite: true,
        recent: true
    });

    // Function to toggle section visibility
    const toggleSection = (section: keyof typeof visibleSections) => {
        setVisibleSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const renderItems = (items: DriveItem[]) => (
        <div className={isGridLayout ? "grid grid-cols-3 gap-4" : "flex flex-col gap-2"}>
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`${item.hoverColor} rounded-2xl p-4 flex items-center gap-2 cursor-pointer ${!isGridLayout && 'w-full'
                        }`}
                >
                    <div className="relative w-8 h-7">
                        {item.type === 'folder' ? (
                            <>
                                <div className={`absolute w-full h-[80%] bottom-0 ${item.color} rounded-sm`}></div>
                                <div className={`absolute w-[40%] h-[40%] top-0 left-0 ${item.color} rounded-t-sm`}></div>
                            </>
                        ) : (
                            <div className={`absolute w-full h-full ${item.color} rounded-sm flex items-center justify-center text-white text-xs font-bold`}>
                                {item.extension.toUpperCase()}
                            </div>
                        )}
                    </div>
                    <p className="font-medium">{item.name}</p>
                </div>
            ))}
        </div>
    );

    return <div className="p-2">
        <div className="mt-4 px-3">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search files and folders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
            </div>
        </div>

        <div className="flex justify-between items-center m-3 p-2">
            <div className="flex gap-2">
                {actionButtons.map((button) => (
                    <Dialog.Root key={button.id}>
                        <Dialog.Trigger asChild>
                            <button className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600">
                                <button.icon size={16} />
                                {button.label}
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                            <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg p-6 shadow-lg">
                                <Dialog.Title className="text-lg font-semibold mb-4">
                                    {button.label}
                                </Dialog.Title>
                                <div className="mb-4">
                                    <input
                                        type={button.id === 'new-folder' ? 'text' : 'file'}
                                        className="w-full border rounded-md p-2"
                                        {...(button.id === 'upload-folder' && { directory: "", webkitdirectory: "" })}
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Dialog.Close asChild>
                                        <button className="px-3 py-2 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300">
                                            Cancel
                                        </button>
                                    </Dialog.Close>
                                    <button className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600">
                                        {button.label}
                                    </button>
                                </div>
                                <Dialog.Close asChild>
                                    <button className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100">
                                        <X size={16} />
                                    </button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                ))}
            </div>
            <button
                onClick={() => setIsGridLayout(!isGridLayout)}
                className="p-2 rounded-md hover:bg-gray-100"
                title={isGridLayout ? "Switch to list view" : "Switch to grid view"}
            >
                {isGridLayout ? <LayoutList size={20} /> : <LayoutGrid size={20} />}
            </button>
        </div>
        <div className="recent-files">
            <h5
                className="m-4 flex items-center gap-2 cursor-pointer hover:text-blue-500"
                onClick={() => toggleSection('myFiles')}
            >
                <ChevronRight
                    size={16}
                    className="transform transition-transform duration-200"
                    style={{
                        transform: visibleSections.myFiles ? 'rotate(90deg)' : 'rotate(0deg)'
                    }}
                />
                My Files
            </h5>
            {visibleSections.myFiles && renderItems(myFiles)}

            <h5
                className="m-4 flex items-center gap-2 cursor-pointer hover:text-blue-500"
                onClick={() => toggleSection('shared')}
            >
                <ChevronRight
                    size={16}
                    className="transform transition-transform duration-200"
                    style={{
                        transform: visibleSections.shared ? 'rotate(90deg)' : 'rotate(0deg)'
                    }}
                />
                Shared with me
            </h5>
            {visibleSections.shared && renderItems(sharedItems)}

            <h5
                className="m-4 flex items-center gap-2 cursor-pointer hover:text-blue-500"
                onClick={() => toggleSection('recent')}
            >
                <ChevronRight
                    size={16}
                    className="transform transition-transform duration-200"
                    style={{
                        transform: visibleSections.recent ? 'rotate(90deg)' : 'rotate(0deg)'
                    }}
                />
                Recent
            </h5>
            {visibleSections.recent && renderItems(recentItems)}
        </div>
    </div>;
};

export default DrivePage;