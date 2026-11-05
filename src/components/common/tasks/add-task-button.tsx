import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddTaskButtonProps {
  onClick?: () => void
}

export const AddTaskButton = ({
  onClick,
}: AddTaskButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="h-7 w-full rounded-full border-dashed p-5
        border-primary text-xs font-normal text-primary
        hover:bg-blue-50"
    >
      Add Task
      <Plus size={14} />
    </Button>
  )
}