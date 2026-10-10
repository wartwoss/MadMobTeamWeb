import { Link } from "@/i18n/navigation";

const projects = [
  {
    name: "Souq Sync",
    tagline: "Marketplace platform",
    year: "2025",
  },
  {
    name: "KurdCast",
    tagline: "Podcast hosting",
    year: "2025",
  },
  {
    name: "Nomad CLI",
    tagline: "Dev tools & utilities",
    year: "2024",
  },
];

export default function ProjectsPreview() {
  return (
    <section className="border-b-4 border-black bg-neutral-900 px-6 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-end gap-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter sm:text-4xl">
            Selected work
          </h2>
          <span className="mb-1 h-1 flex-1 bg-white" />
        </div>

        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Link
              key={project.name}
              href="/projects"
              className="group flex flex-col items-start justify-between gap-4 border-4 border-white p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-white hover:text-black hover:shadow-[8px_8px_0_0_#fff] sm:flex-row sm:items-center sm:p-8"
            >
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter sm:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-1 font-[family-name:var(--font-space-mono)] text-sm capitalize text-neutral-400 group-hover:text-neutral-500">
                  {project.tagline}
                </p>
              </div>
              <span className="font-[family-name:var(--font-space-mono)] text-sm font-bold tracking-widest">
                {project.year}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}