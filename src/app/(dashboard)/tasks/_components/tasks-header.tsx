import { Plus, Search } from "lucide-react"
import { Input } from "../../../../components/ui/input"
import { CommonSelect } from "../../../../components/common/common-select"
import { Button } from "../../../../components/ui/button"

interface IProps {



}
const projectOptions = [
    { label: "All Projects", value: "All Projects" },
    { label: "Project one", value: "Project one" },
    { label: "Project Two", value: "Project Two" },
]

const themeOptions = [
    { label: "Newest", value: "Newest" },
    { label: "Latest", value: "Latest" },

]
const TasksHeader = ({ }: IProps) => {
<<<<<<< HEAD
    return (
    <header className='flex items-center justify-between'>
=======
    return <header className='flex items-center justify-between'>
>>>>>>> 937fba3d463ee8ae0cb6c82d7a4115c617a78faa
        <div className="flex items-center gap-4">
            <div className="relative w-full max-w-80">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-900" />
                <Input
                    type="search"
                    placeholder="Search"
                    aria-label="Search"

<<<<<<< HEAD
                    className="w-full sm:w-75 h-10! rounded-[100px] border-0 bg-secondary-50 pl-12 text-base " />
=======
                    className="h-12 rounded-full border-0 bg-secondary-50 pl-12 text-base shadow-none focus-visible:ring-2 focus-visible:ring-primary" />
>>>>>>> 937fba3d463ee8ae0cb6c82d7a4115c617a78faa
            </div>
            <div className="flex items-center justify-between gap-4 w-25">
                <CommonSelect options={projectOptions} placeholder="All projects" />
                <CommonSelect options={themeOptions} placeholder="Newest" />
            </div>

        </div>
        <Button variant="default" size="default" className="rounded-3xl">
            Create Task
            <Plus />
        </Button>
    </header>
<<<<<<< HEAD
    );
=======
>>>>>>> 937fba3d463ee8ae0cb6c82d7a4115c617a78faa
}

export default TasksHeader