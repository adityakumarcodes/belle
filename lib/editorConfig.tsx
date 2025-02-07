import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import EditorjsList  from "@editorjs/list";
import ImageTool from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';
import { createClient } from "./supabase/client";
import { File } from "buffer";
import { ToolConstructable } from "@editorjs/editorjs";

export const EDITOR_JS_TOOLS = {
  delimiter: Delimiter,
  paragraph: {
    class: Paragraph as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  header: {
    class: Header as unknown as  ToolConstructable,
    shortcut: 'CMD+SHIFT+H',
    inlineToolbar: true,
    config: {
      placeholder: 'Enter a heading',
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 1
    },
  },
  list: {
    class: EditorjsList as unknown as ToolConstructable,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered'
    }
  },
  // image: {
  //   class: ImageTool,
  //   config: {
  //     endpoints: {
  //       byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
  //       byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
  //     },
  //     uploader: {
  //       uploadByFile: async (file:File) => {
  //         console.log('uploading');
  //         const supabase=createClient()
  //         const { data, error } = await supabase.storage
  //           .from('notes')
  //           .upload(`${file?.name}`,file);

  //         console.log(data ?? error);
  //         console.log(file);

  //         return {
  //           success: 1,
  //           file: { url: 'https://kapnkypovldoarardosa.supabase.co/storage/v1/object/public/notes/images/' + file.name },
  //         };
  //       },
  //       uploadByUrl: async (url:string) => {
  //         const response = await fetch(url);
  //         const file = await response.blob();
  //         console.log(file);
  //         const supabase=createClient()
  //         const { data, error } = await supabase.storage
  //           .from('notes')
  //           .upload(`images/${file?.name}`, file);

  //         console.log(data ?? error);

  //         return {
  //           success: 1,
  //           file: { url: url },
  //         };
  //       }
  //     }
  //   }
  // },
};
