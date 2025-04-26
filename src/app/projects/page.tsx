'use client';
interface Project {
    title: string;
    description: string;
    technologies: string[];
}

export default function Projects() {
    const projects: Project[] = [
        {
            title: 'Angular E-commerce App',
            description: 'A full-featured online store built with Angular and Firebase',
            technologies: ['Angular', 'Firebase', 'TypeScript'],
        },
        {
            title: 'Next.js Portfolio',
            description: 'This portfolio site built with Next.js',
            technologies: ['Next.js', 'Tailwind CSS'],
        },
    ];

    return (
        <section id="projects" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
