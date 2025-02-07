const Footer = () => {
    return <div className="h-80 bg-[lightsteelblue] flex flex-col justify-center items-center">
        <h1 className='text-6xl'>Footer</h1>
        <div className="mt-8 text-center text-sm">
            <p>Copyright © 2025</p>
            <p>
                <a href="#">Legal Notice</a>{" "}
                |{" "}
                <a href="#">Privacy Policy</a>
            </p>
        </div>
    </div>;
}

export default Footer;