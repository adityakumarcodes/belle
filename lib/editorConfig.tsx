// import Embed from '@editorjs/embed';
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";
import Delimiter from '@editorjs/delimiter';
import ImageTool from "@editorjs/image";
import { createClient } from "./supabase/client";
import { ToolConstructable } from "@editorjs/editorjs";
// import LinkTool from '@editorjs/link';
// import * as cheerio from 'cheerio';
// import AttachesTool from '@editorjs/attaches';

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header as unknown as ToolConstructable,
    inlineToolbar: true,
    config: {
      placeholder: 'Enter a heading',
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 1
    },
  },
  paragraph: {
    class: Paragraph as unknown as ToolConstructable,
    inlineToolbar: true,
  },
  list: {
    class: EditorjsList as unknown as ToolConstructable,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered'
    }
  },
  image: {
    class: ImageTool as unknown as ToolConstructable,
    config: {
      captionPlaceholder: 'Add an alt text for the image',
      // endpoints: {
      //   byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
      //   byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      // },
      uploader: {
        uploadByFile: async (file: File) => {
          console.log('uploading');
          const supabase = createClient();
          const fileName = `/images/${file.name}`;
          const { data, error } = await supabase.storage
            .from('notes')
            .upload(fileName, file);

          console.log(data ?? error);
          if (error) {
            console.error("Upload error:", error);
            return { success: 0, error: error.message };
          }

          const { data: publicUrlData } = supabase.storage
            .from("notes")
            .getPublicUrl(fileName);


          // 'https://kapnkypovldoarardosa.supabase.co/storage/v1/object/public/notes/images/' + file.name 
          return {
            success: 1,
            file: { url: publicUrlData.publicUrl },
          };
        },
        uploadByUrl: async (url: string) => {
          const response = await fetch(url);
          const file = await response.blob();
          const fileName = url.split('/').pop();
          console.log(fileName);
          const supabase = createClient()
          const { data, error } = await supabase.storage
            .from('notes')
            .upload(`images/${fileName}`, file);

          console.log(data ?? error);

          const { data: publicUrlData } = supabase.storage
            .from("notes")
            .getPublicUrl(`images/${fileName}`);


          return {
            success: 1,
            file: { url: publicUrlData.publicUrl },
          };
        }
      }
    }
  },
  delimiter: Delimiter as unknown as ToolConstructable,
  // linkTool: {
  //   class: LinkTool as unknown as ToolConstructable,
  //   config: {
  //     endpoint: 'http://localhost:3000/api/link-preview',
  //     uploader: {
  //       uploadByUrl: async (url) => {
  //         const response = await fetch(url);
  //         const html = await response.text();

  //         // Load the HTML into cheerio
  //         const $ = cheerio.load(html);

  //         // Extract metadata
  //         const title = $('meta[property="og:title"]').attr('content') || $('title').text();
  //         const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
  //         const image = $('meta[property="og:image"]').attr('content');

  //         return {
  //           success: 1,
  //           meta: {
  //             title: title || 'No title available',
  //             description: description || 'No description available',
  //             image: {
  //               url: imageUrl,
  //             },
  //           },
  //         };
  //       }
  //     }
  //   }
  // },
  // attaches: {
  //   class: AttachesTool as unknown as ToolConstructable,
  //   config: {
  //     endpoint: 'http://localhost:8008/uploadFile'
  //   }
  // },
  // embed: {
  //   class: Embed as unknown as ToolConstructable,
  //   config: {
  //     services: {
  //       youtube: true,
  //       twitter: true,
  //       github: true,
  //     }
  //   }
  // },

};
