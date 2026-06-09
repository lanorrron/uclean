import { Loader2 } from "lucide-react";
import { FC, HTMLAttributes } from "react";

const defaultLoaderProps = {
    size: 32,
    color: "text-primary",
    variant: "circular",
};

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
    size?: number | string;
    color?: string;
    variant?: "circular" | "linear";
}

export const Loader: FC<LoaderProps> = (props) => {
const {color,variant,size,className, ...rest}= {...defaultLoaderProps, ...props}
    return (
        <div
            {...rest}
            className={`flex items-center justify-center ${className}`}
        >
            <div className="text-center">
                {variant === "circular" ? (
                    <Loader2
                        className={`animate-spin mx-auto ${color}`}
                        style={{ height: size, width: size }}
                    />
                ) : (
                    <div className="relative w-full h-2 overflow-hidden bg-gray-200">
                        <div
                            className={`absolute top-0 left-0 h-full ${color} animate-progress`}
                            style={{width: "100%", animationDuration: "1.5s"}}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

