import { ChevronDown, Check } from "lucide-react";

const members = [
  {
    id: 1,
    name: "Mohanad wahib",
    role: "Leader",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Sara Hassan",
    image: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: 3,
    name: "Ali Mohamed",
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 4,
    name: "Khalid Mousa",
    image: "https://i.pravatar.cc/100?img=13",
  },
];

const TeamMembers = () => {
  return (
    <section className="w-full rounded-xl bg-white p-4 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold text-gray-900">
          Team Members
        </h3>

        <button className="flex items-center gap-1 text-[10px] text-gray-500">
          UI/UX
          <ChevronDown size={12} />
        </button>
      </div>

      {/* Members List */}
      <div className="flex flex-col gap-3">

        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-2"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="h-8 w-8 rounded-full object-cover"
              />

              {member.role && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
                  <Check size={10} />
                </span>
              )}
            </div>

            {/* Name */}
            <span className="text-[11px] font-medium text-gray-700">
              {member.name}
            </span>

            {/* Role */}
            {member.role && (
              <span className="ml-auto text-[9px] text-gray-500">
                {member.role}
              </span>
            )}
          </div>
        ))}

      </div>
    </section>
  );
};

export default TeamMembers;