import { Bodoni_Moda } from 'next/font/google'

const font = Bodoni_Moda({ subsets: ['latin'] })
const Footer = () => {
    return <div className="bg-[lightsteelblue] flex flex-col justify-center items-center h-96"  >
        <h1 className={`${font.className} text-6xl`}>This is a Footer</h1>
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