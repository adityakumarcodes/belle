import * as  Tooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

interface HoverTextProps {
    children: ReactNode;
    msg: string;
    dir: 'top' | 'bottom' | 'right' | 'left';
}

const HoverText: React.FC<HoverTextProps> = ({ children, msg, dir }) => {
    return <Tooltip.Provider>
        <Tooltip.Root>
            <Tooltip.Trigger >
                {children}
            </Tooltip.Trigger >
            <Tooltip.Portal>
                <Tooltip.Content side={dir} sideOffset={10} className="rounded-sm bg-gray-200 p-2 ">
                    <p>{msg}</p>
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    </Tooltip.Provider>

}

export default HoverText