import IconButton from '@/components/IconButton'
import { Heart, Lock, MessageSquareText, Trash2, Undo } from 'lucide-react'
import { Bodoni_Moda } from 'next/font/google'
import Image from 'next/image'

const font = Bodoni_Moda({ subsets: ['latin'] })
const BlogsPage = () => {
  const options = [
    { icon: Heart, title: 'Favourite' },
    { icon: Undo, title: 'Undo' },
    { icon: Lock, title: 'Lock' },
    { icon: Trash2, title: 'Trash' },
  ]

  return (
    <div className='flex flex-col h-screen overflow-y-scroll'>
      <div className='m-2 flex items-center justify-between'>
        <nav className="text-gray-600 text-sm">
          <ol className="list-reset flex">
            <li>
              <a href="#" className="hover:underline">Home</a>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li>
              <a href="#" className="hover:underline">Category</a>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-500">Current Page</li>
          </ol>
        </nav>
        <div className='flex space-x-4 ml-6 flex-wrap'>
          {options.map((op) => (
            <span
              className='flex items-center gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer'
              key={op.title}
            >
              <op.icon className="w-5 h-5 text-gray-600 group-hover:text-black" />
              <p className="text-gray-700 group-hover:text-black select-none">{op.title}</p>
            </span>
          ))}
        </div>
      </div>

      <div className='flex m-4'>
        <IconButton title='Add comment' icon={MessageSquareText} href={''} />
      </div>
      <div className='m-4 p-2'>
        <p className={`text-6xl m-4 ${font.className}`}>5 🔑s to a longer life </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis ullamcorper facilisis. Sed sed pellentesque nulla. In scelerisque velit eu enim aliquam, ac interdum nunc feugiat. Sed est lacus, dictum ac nisl sed, semper viverra neque. In vitae tempus massa. In vel lacus enim. Etiam tincidunt leo nulla, quis efficitur velit porttitor non. Maecenas sodales posuere enim nec porta.
          Fusce at libero non neque tincidunt condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur laoreet lacus ipsum, aliquam sodales neque ultrices sed. Quisque rutrum arcu vestibulum risus cursus, ornare finibus lorem malesuada. Fusce tempor malesuada tempor. Duis condimentum neque id vestibulum porttitor. Duis felis ex, euismod eget est eu, fringilla porttitor sapien. Nullam aliquam libero ut nunc feugiat, at consectetur urna feugiat. Nunc pulvinar consectetur tincidunt.
          <Image src='https://cdn.pixabay.com/photo/2023/07/31/16/37/sugar-apple-8161386_1280.jpg' alt={''} width={500} height={50} className='overflow-clip rounded-md object-fit m-6' />
          Suspendisse leo sem, venenatis a laoreet finibus, euismod sit amet nulla. Suspendisse lacus diam, vulputate quis posuere ut, posuere dictum purus. Nullam at tristique ipsum, at vehicula ipsum. Donec ac neque et diam eleifend vulputate vel et justo. Vestibulum imperdiet magna eget enim iaculis euismod vitae ac ipsum. Quisque ultrices massa at enim sollicitudin, at elementum lacus interdum. Fusce ut maximus ligula, vel sollicitudin eros.
          Donec at volutpat lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur pellentesque nisi vitae dignissim rutrum. Vivamus elementum turpis vel ullamcorper facilisis. Sed venenatis velit in vestibulum sagittis. Donec vel mollis sapien. Praesent velit massa, semper sagittis odio eget, euismod porta purus. Pellentesque id convallis magna, vitae semper metus. Aenean aliquam odio nisl, nec cursus turpis sodales id. Integer quam eros, tincidunt ac ante vitae, malesuada semper est. Etiam at tellus pharetra sapien tempor scelerisque id maximus nibh. In vel finibus tortor, sit amet efficitur lacus. Ut malesuada purus ut fringilla suscipit.
          In justo eros, lacinia vitae ipsum id, sodales suscipit est. Integer sodales, dolor porta placerat efficitur, dui nunc efficitur erat, varius luctus mauris nisl vel dolor. Vivamus viverra interdum enim. Proin ultricies odio turpis, vitae sodales lacus rutrum egestas. Phasellus et dolor nec ante aliquet sollicitudin. Sed eu elit sed orci malesuada ultrices quis non quam. Mauris feugiat velit a mattis iaculis.
        </p>
      </div>
    </div>
  )
}

export default BlogsPage
