import * as Switch from "@radix-ui/react-switch";

const ToggleTheme = () => {
    return (
        <div className="flex items-center">
            <label className="pr-4">Light mode</label>
            <Switch.Root className="relative h-[25px] w-[42px] cursor-default rounded-full bg-gray-400  data-[state=checked]:bg-black">
                <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
        </div>
    )
}

export default ToggleTheme