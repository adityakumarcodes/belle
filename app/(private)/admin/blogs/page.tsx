import IconButton from "@/components/IconButton"
import { Plus } from "lucide-react"

const AdminPage = () => {
    return (
        <div className="flex p-2">
            <IconButton title={'Add blog'} icon={Plus} href='/admin/blogs/addBlog'/>
        </div>
    )
}

export default AdminPage
