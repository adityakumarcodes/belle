"use client"
import { assets } from '@/assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

interface FormData {
  title: string;
  description: string;
  category: 'startup' | 'technology' | 'lifestyle';
  author: string;
  authorImg: string;
}

const AddProductPage = () => {
    const [image, setImage] = useState<File|false>(false)
    const [data, setData] = useState<FormData>({
      title: '',
      description: '',
      category: 'startup',	
      author: 'Alex Bennett',
      authorImg: '/author_img.png',
    })

    const  onChangeHandler= (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
      const {name,value}=e.target;
      setData(prevData=>({...prevData,[name]:value}))
      console.log(data);
    }

    const onSubmitHandler = async (e:React.FormEvent)=>{
      e.preventDefault();//not refresh AddProductPage
      if(!image) return; // check if image is selected 
      const formData=new FormData();
      formData.append('title',data.title)
      formData.append('description',data.description)
      formData.append('category',data.category)
      formData.append('author',data.author)
      formData.append('authorImg',data.authorImg)
      formData.append('image',image)
      const response =await axios.post('/api/blog',formData);
      console.log(response.data.message)
      if(response.data.success){
        toast.success(JSON.stringify(response.data.msg));
        setImage(false);
        setData({
          title: '',
          description: '',
          category: 'startup',	
          author: 'Alex Bennett',
          authorImg: '/author_img.png',
        })
      }else{
        toast.error(response.data.msg)
      }
    }
  return (
    <>
    <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload thumbnail</p>
        <label htmlFor='image'>
            <Image className='mt-4' src={!image?assets.upload_area:URL.createObjectURL(image)} height={70} width={120} alt=''/>        
        </label>
        <input onChange={(e)=>setImage(e.target.files?e.target.files[0]:false)} type='file' id='image' hidden required/>
        <p className='text-xl mt-4'>Blog title</p>
        <input name='title' onChange={onChangeHandler} value= {data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type='text' required placeholder='Type here'/>
        <p className='text-xl mt-4'>Blog Description</p>
        <textarea name='description' onChange={onChangeHandler} value= {data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' required placeholder='Write content' rows={6}/>
        <p className='text-xl mt-4'>Blog Category</p>
        <select name='category' onChange={onChangeHandler} value= {data.category}  className='w-40 mt-4 px-4 py-3 border'>
            <option value='technology'>Technology</option>
            <option value='lifestyle'>Lifestyle</option>
            <option value='startup'>Startup</option>
        </select> 
        <br />
        <button type="submit" className='m-10 w-40 h-12 bg-black text-white '>Add</button>
    </form>
    </>
  )
}

export default AddProductPage