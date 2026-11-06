const ProjectProgress = () => {
  return (
    <section className="w-full  rounded-xl bg-white p-3 ">
      {/* Header */}
      <h3 className="text-sm font-semibold text-gray-800">
        Project Progress
      </h3>

      {/* Gauge */}
      <div className="flex flex-col items-center mt-3">

        <svg
          viewBox="0 0 200 110"
          className="w-45 h-45"
        >
          {/* Background Arc */}
          <path
            d="M 25 85 A 75 75 0 0 1 175 85"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Progress Arc - 78% */}
          <path
            d="M 25 85 A 75 75 0 0 1 157.7 37.2"
            fill="none"
            stroke="#262626"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Needle */}
          <line
            x1="100"
            y1="85"
            x2="113"
            y2="51"
            stroke="#262626"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Needle Center */}
          <circle
            cx="100"
            cy="85"
            r="5"
            fill="white"
            stroke="#262626"
            strokeWidth="1.5"
          />
        </svg>

        {/* Percentage */}
        <div className="flex flex-col items-center -mt-1">
          <span className="text-sm font-semibold text-gray-800">
            78%
          </span>

          <span className="text-[9px] text-gray-600">
            Project Completed
          </span>
        </div>
      </div>

      {/* Tasks Statistics */}
      <div className="flex items-end justify-between mt-8 gap-2">

        {/* Pending */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-gray-800">
            36<span className="text-gray-400 font-normal">/94</span>
          </p>

          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span className="text-[9px] text-gray-500 whitespace-nowrap">
              Pending tasks
            </span>
          </div>
        </div>

        {/* In Progress */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-gray-800">
            42<span className="text-gray-400 font-normal">/94</span>
          </p>

          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[9px] text-gray-500 whitespace-nowrap">
              In progress tasks
            </span>
          </div>
        </div>

        {/* Completed */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-gray-800">
            42<span className="text-gray-400 font-normal">/94</span>
          </p>

          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[9px] text-gray-500 whitespace-nowrap">
              Completed tasks
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectProgress;