import { cn } from "@/lib/utils"
import { LucideIcon,Undo2  } from "lucide-react"

interface ToolBarButtonProps {
  onClick?: () => void,
  isActive?: boolean,
  icon:LucideIcon
}
const ToolBarButton = ({
  onClick,
  isActive,
  icon:Icon
}: ToolBarButtonProps) => {

  return<button onClick={onClick} className={cn("flex items-center justify-center h-7 min-w-7 rounded-md text-sm  hover:bg-neutral-400/80",isActive&&"bg-neutral-400/80")} >
    <Icon/>

  </button>
  
}


const ToolBar = () => {
  return (
    <div className="bg-[#F1F4F9]  min-h-[40px] px-2 py-1 flex items-center  overflow-x-auto "> <ToolBarButton icon={Undo2}/> </div>
  )
}

export default ToolBar