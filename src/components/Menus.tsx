import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { Settings } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";

type Position = { x: number; y: number } | null;

type MenusContextType = {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
};

const MenusContext = createContext<MenusContextType | undefined>(undefined);

function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<Position>(null);

  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

const Menu = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-end">{children}</div>
);

function Toggle({ id }: { id: string }) {
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error("Toggle must be used within Menus");

  const { open, close, openId, setPosition } = ctx;

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: rect.left,
      y: rect.bottom + 8,
    });

    openId === id ? close() : open(id);
  }

  return (
    <button data-toggle onClick={handleClick}>
      <Settings className="cursor-pointer hover:text-gray-500" />
    </button>
  );
}

function List({ id, children }: { id: string; children: ReactNode }) {
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error("List must be used within Menus");

  const { openId, position, close } = ctx;
  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id || !position) return null;

  return createPortal(
    <ul
      ref={ref}
      style={{ top: position.y, left: position.x }}
      className="fixed z-50 bg-stone-50 shadow-md rounded-md text-black p-2 w-34 "
    >
      {children}
    </ul>,
    document.body
  );
}

type MenuButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
};

function Button({ children, icon, onClick, danger }: MenuButtonProps) {
  const ctx = useContext(MenusContext);
  if (!ctx) throw new Error("Button must be used within Menus");

  // const { close } = ctx;

  // function handleClick() {
  //   onClick?.();
  //   close();
  // }

  return (
    <li
      className={`w-full flex justify-between ${
        danger
          ? "hover:bg-red-100 hover:text-red-600"
          : "hover:bg-stone-200 hover:text-blue-500"
      }`}
    >
      <button
        onClick={onClick}
        className="flex items-center gap-2 text-left p-2"
      >
        {icon}
        <span className="text-sm">{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
