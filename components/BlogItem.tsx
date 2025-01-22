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
    <div>

      {/* Mobile */}
      <div className="block lg:hidden max-w-[300px] bg-white border-2 border-black hover:shadow-xl rounded-md select-none">
        <Link href={`/blog/${id}`}>
          <Image src={image} alt={title} width={400} height={400} className="rounded-md" />
          <p className="hidden md:inline-block ml-4 mt-4 px-2 bg-orange-200 text-sm rounded-full">{category}</p>
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

      {/* Desktop */}
      <div className='hidden lg:block'>


        <div className="flex max-w-[500px] bg-white border-2 border-black hover:shadow-xl rounded-md select-none">
          <div className="w-2/5">
            <Link href={`/blog/${id}`}>
              <Image
                src={image}
                alt={title}
                width={300}
                height={300}
                className="rounded-l-md object-cover w-full h-full"
              />
            </Link>
          </div>
          <div className="w-3/5 p-5">
            <Link href={`/blog/${id}`}>
              <p className="inline-block mb-2 px-2 py-1 bg-orange-200 text-sm rounded-full">{category}</p>
              <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{title}</h5>
              <p className="mb-3 text-sm tracking-tight text-gray-700 line-clamp-3">{description}</p>
              <div className="inline-flex items-center py-2 ">Read more
                <Image src={assets.arrow} alt="Arrow Icon" width={12} height={12} className="ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </div>


    </div>
  );
};

export default BlogItem;
