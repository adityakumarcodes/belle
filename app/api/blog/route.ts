import getBlurImage from "@/lib/getBlurImage";
import { createClient } from "@/lib/supabase/server";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server"

//read all blogs from db on the endpoint http://localhost:3000/api/blog
export async function GET(request: NextRequest) {

    const supabase = await createClient();

    //http://localhost:3000/api/blog?id=98
    const blogId = request.nextUrl.searchParams.get('id')
    if (blogId) {
        const { data: blog, error } = await supabase
            .from('blogs')
            .select("*")
            .eq('id', blogId)
            .single();
        if (error) return NextResponse.json({ success: false, msg: error.message })
        else console.log(`Getting ${blogId} data`);
        return NextResponse.json(blog)
    }

    const { data: blogs, error } = await supabase
        .from('blogs')
        .select('*')
        
    const blogsWithBlur = await Promise.all(
        blogs!.map(async (blog) => {
            const { base64, imgUrl } = await getBlurImage(blog.image);
            return { ...blog, image: imgUrl, base64 };
        })
    );
    
    if (error) return NextResponse.json({ success: false, msg: error.message })
    else console.log('Getting all blogs');
    return NextResponse.json(blogsWithBlur)
}

//create blogs in db
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const timestamp = Date.now();
    const image = formData.get('image') as File;
    console.log(image);
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `/public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);//image stored in public folder
    const imgUrl = `/${timestamp}_${image.name}`;
    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgUrl}`,
        authorImg: `${formData.get('authorImg')}`,
    }

    const supabase = await createClient();
    const { error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select();
    if (error) return NextResponse.json({ success: false, msg: error.message })
    else console.log(blogData);
    return NextResponse.json({ success: true, msg: 'Blog Added' })
}