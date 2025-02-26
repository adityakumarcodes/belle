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

interface EditorState {
    isLoading: boolean;
    isDirty: boolean;
}

const MyTextEditor: React.FC<EditorProps> = ({ initialData, id }) => {
    const editorInstance = useRef<EditorJS | null>(null);
    const [editorData, setEditorData] = useState(initialData);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [state, setState] = useState<EditorState>({
        isLoading: false,
        isDirty: false,
    });
    const saveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const debouncedSave = (data: OutputData) => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(async () => {
            await handleSave(data, false);
        }, 5000);
    };

    useEffect(() => {
        initEditor();
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
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
                onChange: async (api) => {
                    setState(prev => ({ ...prev, isDirty: true }));
                    const data = await api.saver.save();
                    debouncedSave(data);
                },
                placeholder: "Type '/' for commands",
                readOnly: isReadOnly,
            });
        }
    }

    const extractHeader = (data: OutputData) => {
        const firstBlock = data['blocks']?.[0];
        return firstBlock?.type === "header" ? firstBlock.data.text : null;
    };

    const handleSave = async (data?: OutputData, reinitialize: boolean = true) => {
        try {
            setState(prev => ({ ...prev, isLoading: true }));
            if (!data && editorInstance.current) {
                data = await editorInstance.current.save();
            }
            if (!data) return;
            // Only update editor data if we want to reinitialize
            if (reinitialize) {
                setEditorData(data);
            }

            const title = extractHeader(data) || `Note_${id}`;
            const supabase = createClient();
            const { error } = await supabase
                .from('notes')
                .update({ content: data, title: title })
                .eq('id', id);

            if (error) throw error;

            setState(prev => ({ ...prev, isDirty: false }));
            toast.success("Content saved successfully!");
        } catch (error) {
            console.error("Error updating content:", error);
            toast.error("Failed to save data!");
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const toggleReadOnly = async () => {
        if (editorInstance.current) {
            await editorInstance.current.readOnly.toggle();
            setIsReadOnly((prev) => !prev);
            console.log("Read-Only Mode:", !isReadOnly);
        }
    };

    return <div className="p-2">
        <div className="flex gap-2 mb-4">
            <button
                className={`px-4 py-2 rounded-md transition-colors ${isReadOnly ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'
                    } text-white disabled:opacity-50`}
                onClick={toggleReadOnly}
            >
                {isReadOnly ? "Edit" : "Cancel"}
            </button>
            <button
                className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
                onClick={() => handleSave()}
                disabled={isReadOnly || !state.isDirty || state.isLoading}
            >
                {state.isLoading ? "Saving..." : "Save"}
            </button>
            {state.isDirty && !isReadOnly && (
                <p className="text-sm text-gray-500 mt-2">Unsaved changes</p>
            )}
        </div>
        <div className="rounded-md" id='editorjs-container' />
        {/* <Image src='https://cdn.pixabay.com/photo/2023/07/31/16/37/sugar-apple-8161386_1280.jpg' alt={''} width={500} height={50} className='overflow-clip rounded-md object-fit m-6' /> */}
    </div>
}

export default MyTextEditor



// This should prevent the page from jumping during autosave while still maintaining the saving functionality. The editor will maintain its cursor position and scroll position during autosave operations.
// 1. Added a `reinitialize` parameter to `handleSave` that controls whether we update the editor state
// 2. Modified `debouncedSave` to call `handleSave` with `reinitialize: false` to prevent editor reinitialization during autosave
// 3. Only update `editorData` state when `reinitialize` is true (which will be the case for manual saves)