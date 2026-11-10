import {
  BriefcaseBusiness,
  CalendarDays,
  Flag,
  ListTodo,
  Clock3,
} from "lucide-react";

const details = [
  {
    title: "Project Type",
    value: "SaaS",
    icon: BriefcaseBusiness,
    color: "bg-blue-50 text-blue-500",
  },
  {
    title: "Start Date",
    value: "Oct 12",
    icon: CalendarDays,
    color: "bg-pink-50 text-pink-500",
  },
  {
    title: "Deadline",
    value: "Dec 25",
    icon: Clock3,
    color: "bg-orange-50 text-orange-500",
  },
  {
    title: "Priority",
    value: "High",
    icon: Flag,
    color: "bg-red-50 text-red-500",
  },
  {
    title: "Total Tasks",
    value: "140",
    icon: ListTodo,
    color: "bg-purple-50 text-purple-500",
  },
];

const ProjectDetails = () => {
  return (
    <section className="rounded-xl bg-white p-4 border border-bg-label">
      <h2 className="mb-2 text-lg font-medium text-black">
        Product Details
      </h2>

      <div className="grid grid-cols-2 gap-x-5 gap-y-5 md:grid-cols-3">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.color}`}
              >
                <Icon size={16} />
              </div>

              <div>
                <p className="text-[10px] text-gray-400">
                  {item.title}
                </p>

                <p className="mt-1 text-[11px] font-medium text-gray-800">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectDetails;