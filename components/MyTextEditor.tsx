'use client'
import { EDITOR_JS_TOOLS } from '@/lib/editorConfig';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import EditorJS, { OutputData } from '@editorjs/editorjs';

const INITIAL_DATA = {
    time: 1701368244004,
    blocks: [
        {
            "type": "header",
            "data": {
                "text": "5 🔑s to a longer life ",
                "level": 1
            }
        },
        {
            "id": "zbGZFPM-iI",
            "type": "paragraph",
            "data": {
                "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
            }
        },
        {
            "id": "qYIGsjS5rt",
            "type": "header",
            "data": {
                "text": "Key features",
                "level": 3
            }
        },
        {
            "id": "XV87kJS_H1",
            "type": "list",
            "data": {
                "style": "unordered",
                "items": [
                    "It is a block-styled editor",
                    "It returns clean data output in JSON",
                    "Designed to be extendable and pluggable with a simple API"
                ]
            }
        },
        {
            "id": "AOulAjL8XM",
            "type": "header",
            "data": {
                "text": "What does it mean «block-styled editor»",
                "level": 3
            }
        },
        {
            "id": "cyZjplMOZ0",
            "type": "paragraph",
            "data": {
                "text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
            }
        },
        {
            "type": "delimiter",
            "data": {}
        },
    ],
    version: "2.30.8",
};

interface EditorProps {
    initialData?: OutputData;
    id: number;
}


const MyTextEditor: React.FC<EditorProps> = ({ initialData, id }) => {
    const editorInstance = useRef<EditorJS | null>(null);
    const [editorData, setEditorData] = useState(initialData);
    const [isReadOnly, setIsReadOnly] = useState(true);

    useEffect(() => {
        initEditor();
        return () => {
            if (editorInstance.current?.destroy) {
                editorInstance.current?.destroy();
                editorInstance.current = null;
            }
        };
    }, [editorData, isReadOnly]);

    const initEditor = () => {
        if (!editorInstance.current) {
            const editor = new EditorJS({
                holder: "editorjs-container",
                tools: EDITOR_JS_TOOLS,
                data: editorData || INITIAL_DATA,
                onReady: () => {
                    console.log("Editor.js is ready to work!");
                    editorInstance.current = editor;
                },
                // async onChange(api, event) {
                // clearTimeout(autoSaveTimeout.current);
                // autoSaveTimeout.current = setTimeout(() => {
                //     handleSave();
                // }, 5000);
                // },
                placeholder: "Type '/' for commands",
                readOnly: isReadOnly,
            });
        }
    }

    const extractHeader = (data: OutputData) => {
        const firstBlock = data['blocks']?.[0];
        return firstBlock?.type === "header" ? firstBlock.data.text : null;
    };

    const handleSave = async () => {
        if (editorInstance.current) {
            const data = await editorInstance.current.save();
            setEditorData(data)
            const title = extractHeader(data) || `Note_${id}`;
            const supabase = createClient();
            const { error } = await supabase
                .from('notes')
                .update({ content: data, title: title })
                .eq('id', id);

            if (error) {
                console.error("Error updating content:", error);
                toast.error("Failed to save data!");
            } else {
                toast.success("Content saved successfully!");
            }
        }
        toggleReadOnly();
    };


    const toggleReadOnly = async () => {
        if (editorInstance.current) {
            await editorInstance.current.readOnly.toggle();
            setIsReadOnly((prev) => !prev);
            console.log("Read-Only Mode:", !isReadOnly);
        }
    };

    return <div className="p-2 text-left">
        <button className="btn" onClick={handleSave} disabled={isReadOnly}>
            Save
        </button>
        <button className="btn" onClick={toggleReadOnly}>
            {isReadOnly ? "Edit" : "Read"}
        </button>
        <div className="px-2 py-2" id='editorjs-container' />
        {/* <Image src='https://cdn.pixabay.com/photo/2023/07/31/16/37/sugar-apple-8161386_1280.jpg' alt={''} width={500} height={50} className='overflow-clip rounded-md object-fit m-6' /> */}
    </div>

}

export default MyTextEditor