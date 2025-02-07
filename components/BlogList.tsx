'use client';
import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import BlogItem from './BlogItem';

type Blog = {
    id: number;
    image: string;
    category: string;
    title: string;
    description: string;
};

const BlogList = () => {
    const [menu, setMenu] = useState<'All' | 'Technology' | 'Startup' | 'Lifestyle'>('All');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const fetchBlogs = async () => {
        const res = await axios.get('/api/blog');
        setBlogs(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        fetchBlogs()
    }, []);

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-6 my-10">
                <button onClick={() => setMenu('All')} className={menu === 'All' ? 'bg-orange-200  py-2 px-4 rounded-full' : ''}>All</button>
                <button onClick={() => setMenu('Technology')} className={menu === 'Technology' ? 'bg-orange-200  py-2 px-4 rounded-full' : ''}>Technology</button>
                <button onClick={() => setMenu('Startup')} className={menu === 'Startup' ? 'bg-orange-200  py-2 px-4 rounded-full' : ''} >Startup</button>
                <button onClick={() => setMenu('Lifestyle')} className={menu === 'Lifestyle' ? 'bg-orange-200  py-2 px-4 rounded-full' : ''}>Lifestyle</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-10 mb-16 mx-4 justify-items-center ">
                {blogs.length > 0 && blogs !== undefined ?
                    blogs.filter(item => menu === 'All' ? true : item.category === menu)
                        .map((item, index) => <BlogItem key={index} id={item.id} image={item.image.toString()} category={item.category} title={item.title} description={item.description} />)
                    : <h6>Loading...</h6>}
            </div>
        </div>
    );
};

export default BlogList;
