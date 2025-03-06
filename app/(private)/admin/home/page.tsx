'use client'
import WordOfTheDay from '@/components/WordOfTheDay';

const Home = () => {
    // const [isFullscreen, setIsFullscreen] = useState(false);

    // const toggleFullscreen = () => {
    //     if (!document.fullscreenElement) {
    //         document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    //     } else {
    //         document.exitFullscreen().then(() => setIsFullscreen(false));
    //     }
    // };

    return <>

        {/* <button onClick={toggleFullscreen} className="p-2">
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button> */}

        <WordOfTheDay />
        {/* <Image src="https://miro.medium.com/v2/resize:fit:1273/0*OXMvicPW6tgqadeH" alt="" width={400} height={250} /> */}
    </>
}

export default Home