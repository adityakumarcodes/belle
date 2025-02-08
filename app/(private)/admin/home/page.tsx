import { Feather, VenetianMask, CloudUpload } from "lucide-react"
import Link from "next/link"

const Home = () => {
  const btnList = [
    { label: 'Blogs', icon: Feather, link: '/admin/blogs' },
    { label: 'Secrets', icon: VenetianMask, link: '/admin/' },
    { label: 'Backup', icon: CloudUpload, link: '/admin/' },
  ]

  return (
    <div>
      <p>Home</p>
      <div className="flex">

      {btnList.map((item, index) => <Link href={item.link} key={index} className="flex items-start gap-1.5 group hover:bg-gray-200 rounded-md p-1.5 cursor-pointer">
        <item.icon strokeWidth={1.25} />
        <p>{item.label}</p>
      </Link>)}
      </div>
    </div>
  )
}

export default Home