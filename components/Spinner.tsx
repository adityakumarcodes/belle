// const Spinner = () => {
//     return <div className="flex items-center w-full h-full">
//         <div className="rounded-full w-10 h-10 bg-primary-color animate-spin">            
//             <div className="rounded-full h-5 w-5 bg-white" />
//         </div>
//         <h1 className="text-xl m-3 animate-bounce">Loading...</h1>
//     </div>;
// }

// export default Spinner;

const Spinner = ({ msg = 'Loading...' }) => {
    return <div className="w-full flex flex-col items-center justify-center m-4 p-4">
        <div className="loader"></div>
        <p className="text-lg">{msg}</p>
    </div>;
}

export default Spinner;