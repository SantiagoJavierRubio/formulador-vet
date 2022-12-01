import { useState, ReactNode, useEffect, useRef } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";


interface IProps {
    children: ReactNode;
    title: string;
    startOpen?: boolean;
    forceState?: boolean;
}

export default function FormElement({ children, title, startOpen = false, forceState }: IProps) {
    const [isOpen, setOpen] = useState<boolean>(startOpen);
    const elRef = useRef<HTMLDivElement>(null)
    const handleOpen = () => setOpen(!isOpen)
    useEffect(() => {
        if(forceState !== undefined && forceState !== isOpen) {
            setOpen(forceState)
            setTimeout(() => {
                elRef.current && elRef.current.scrollIntoView({ behavior: "smooth" });
            }, 200)
        } 
    }, [forceState, isOpen])
  return (
    <div className="w-full max-w-6xl m-auto max-h-fit" ref={elRef}>
        <button type="button" onClick={handleOpen} className="flex flex-row w-full justify-between p-2 rounded-sm bg-slate-700">
            {title}
            {' '}
            {isOpen ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
        </button>
        <div className={`w-full p-2 flex flex-col justify-stretch origin-top ${isOpen ? "scale-y-100 h-fit" : "scale-y-0 h-0"} overflow-y-hidden transition-all ease-in-out`}>
            {children}
        </div>
    </div>
  )
}
