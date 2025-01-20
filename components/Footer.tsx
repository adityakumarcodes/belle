import { Bodoni_Moda } from 'next/font/google'

const font = Bodoni_Moda({ subsets: ['latin'] })
const Footer = () => {
    return <div className="h-96 section">
        <h1 className={`${font.className} text-6xl`}>Footer</h1>
        <div className="mt-8 text-center text-sm text-gray-600">
            <p>Copyright © 2025</p>
            <p>
                <a href="#" className="hover:text-black">Legal Notice</a>{" "}
                |{" "}
                <a href="#" className="hover:text-black">Privacy Policy</a>
            </p>
        </div>
    </div>;
}

export default Footer;