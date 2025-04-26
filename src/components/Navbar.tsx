'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Define your navigation items
const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Skills', href: '/skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    {/* Replace with your logo */}
                    <Image
                        src="/logo.png" // Path to your logo file in public folder
                        alt="Your Portfolio Logo"
                        width={300} // Adjust width as needed
                        height={300} // Adjust height as needed
                        className="h-10 w-auto" // Responsive sizing
                        priority // Preload important image
                    />
                </Link>
                <div className="space-x-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`hover:text-gray-300 transition-colors ${
                                pathname === item.href ? 'text-blue-400 font-medium' : ''
                            }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
