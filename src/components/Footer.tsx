'use client';
export default function Footer() {
    const currentYear: number = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <p>© {currentYear} My Portfolio. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" className="hover:text-gray-300">LinkedIn</a>
                    <a href="#" className="hover:text-gray-300">GitHub</a>
                    <a href="#" className="hover:text-gray-300">Twitter</a>
                </div>
            </div>
        </footer>
    );
}
