'use client'
import axios from 'axios'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import { Bodoni_Moda } from 'next/font/google'
const fontHeading = Bodoni_Moda({ subsets: ['latin'] })
type BlogData = {
  title: string;
  author: string;
  authorImg: string;
  image: string;
  description: string;
};

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const Page = ({ params }:PageProps) => {
  const { id } = use(params)
  const [data, setData] = useState<BlogData|null>(null)
  const fetchBlogData = async () => {
    const res = await axios.get('/api/blog/', {
      params: {
        id: id
      }
    });
    setData(res.data)
  }
  useEffect(() => {
    fetchBlogData();
  },[])

  if(!data){
    return <h1>Loading...</h1>
  }
  const imgUrl=`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/thumbnails/${data.image}`;

  return (<div>
    <div className='bg-gray-200 p-5'>
      <div className='text-center my-24'>
        <h1 className={`text-5xl sm:text-6xl max-w-[800px] mx-auto text-balance ${fontHeading.className}`}>{data.title}</h1>
        <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={60} height={60} alt={''} />
        <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
      </div>
    </div>
    <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10 ">
        <Image src={imgUrl} className='border-4 border-white' width={1280} height={720} alt={''} />
        <h1 className='my-8 text-[26px] font-semibold'>Introduction</h1>
        <p>{data.description}</p>
        <h3 className='my-5 text-[18px] font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
        <p className='my-3'> Error animi aperiam culpa cum, dolore numquam ipsam deleniti rerum quo itaque rem cumque unde ad eaque repellendus accusamus eveniet nisi quis.</p>
        <p className='my-3'> Error animi aperiam culpa cum, dolore numquam ipsam deleniti rerum quo itaque rem cumque unde ad eaque repellendus accusamus eveniet nisi quis.</p>
      </div>
      </div>
  )
}

export default Page