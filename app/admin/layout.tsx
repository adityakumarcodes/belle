import Sidebar from "@/components/Sidebar";
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <ToastContainer theme="light" position="bottom-right"/>
            <Sidebar/>
            {children}
        </div>
    )
}
