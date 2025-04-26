'use client';
interface Skill {
    name: string;
    level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
}

export default function Skills() {
    const skills: Skill[] = [
        { name: 'Angular', level: 'Expert' },
        { name: 'TypeScript', level: 'Expert' },
        { name: 'Next.js', level: 'Intermediate' },
        { name: 'React', level: 'Intermediate' },
        { name: 'JavaScript', level: 'Advanced' },
        { name: 'HTML/CSS', level: 'Advanced' },
    ];

    return (
        <section id="skills" className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className={`h-2.5 rounded-full ${
                                        skill.level === 'Expert' ? 'bg-green-600 w-full' :
                                            skill.level === 'Advanced' ? 'bg-blue-600 w-3/4' :
                                                'bg-yellow-500 w-1/2'
                                    }`}
                                ></div>
                            </div>
                            <p className="mt-2 text-gray-600">{skill.level}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
