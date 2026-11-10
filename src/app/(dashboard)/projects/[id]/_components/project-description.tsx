interface ProjectDescriptionProps {
  description: string
}
const ProjectDescription = ({ description }: ProjectDescriptionProps) => {
  return (
    <section className="rounded-[16px] bg-white border border-bg-label p-4 ">
      <h2 className="mb-2 text-lg font-medium text-black">
        Description
      </h2>

      <p className="max-w-2xl text-base leading-[150%] text-gray-500">{description}</p>
    </section>
  );
};

export default ProjectDescription;