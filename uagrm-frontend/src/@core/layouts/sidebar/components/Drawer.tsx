import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right";
  children: React.ReactNode;
  classNameContent?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = "left",
  children,
  classNameContent = "",
}) => {
  const translateClass =
    position === "left" ? "-translate-x-full" : "translate-x-full";

const openClass = "translate-x-0";

  return (
    <div
      className={`
        fixed inset-0 z-50 flex
        ${position === "left" ? "justify-start" : "justify-end"}
        bg-foreground/20 backdrop-blur-[1px]
        transition-opacity duration-800
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          h-full w-64 bg-card transform
          transition-transform duration-800 ease-in-out
          ${isOpen ? openClass : translateClass}
          flex flex-col ${classNameContent}
        `}
      >
        <div className="p-4 grow">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
