import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Hi, I'm <span className="text-blue-600">Nalinka Heshan</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                A Full-Stack Developer
            </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
              I build exceptional digital experiences that are fast, accessible, and visually appealing.
              Currently focusing on modern web technologies and user-centered design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                  href="/work"
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View My Work <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link
                  href="/contact"
                  className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Work */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold mb-10 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
                <div key={project} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Project Title</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Brief description of the project and technologies used.
                    </p>
                    <Link href="/project-slug" className="text-blue-600 hover:underline">
                      View Project
                    </Link>
                  </div>
                </div>
            ))}
          </div>
        </section>
      </div>
  );
}
