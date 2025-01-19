import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/assets/assets';

// Define the type for the component props
interface BlogItemProps {
  image: string; 
  category: string;
  title: string; 
  description: string; 
  id: string | number; 
}

const BlogItem: React.FC<BlogItemProps> = ({ image, category, title, description, id }) => {
  return (
    <div className="max-w-[300px] bg-white border-2 border-black hover:shadow-xl rounded-md select-none">
      <Link href={`/blog/${id}`}>
        <Image src={image} alt={title} width={400} height={400} className="rounded-md" />
        <p className="ml-4 mt-4 px-1 inline-block bg-black text-white text-sm rounded-full">{category}</p>
        <div className="p-5">
          <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{title}</h5>
          <p className="mb-3 text-sm tracking-tight text-grey-700">{description}</p>
          <div className="inline-flex items-center py-2 text-center">
            Read more
            <Image src={assets.arrow} alt="Arrow Icon" width={12} className="ml-2" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogItem;
