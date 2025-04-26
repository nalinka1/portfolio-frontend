'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
                <Link href="/" className="text-xl font-bold">My Portfolio</Link>
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
