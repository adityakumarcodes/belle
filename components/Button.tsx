'use client'
type ButtonProps = {
    title: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>; // Type for the onClick event handler.
};

const Button:React.FC<ButtonProps> = ({ title, disabled = false, onClick = () => { } }) => {
    return (
        <button className={disabled ? `m-[10px] bg-gray-300 px-4 py-2 cursor-not-allowed rounded-sm opacity-50` : `btn `} onClick={onClick}>{title}</button>
    );
}
// https://stackoverflow.com/questions/41488715/how-to-disable-button-in-react-js
export default Button;
