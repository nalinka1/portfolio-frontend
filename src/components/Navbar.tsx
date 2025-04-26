// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <nav className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
            <Link href="/" className="text-2xl font-bold text-blue-600">
                My Portfolio
            </Link>
            <div className="flex gap-6">
                <Link
                    href="/"
                    className={isActive('/') ? 'font-semibold text-blue-500' : 'text-gray-700'}
                >
                    Home
                </Link>
                <Link
                    href="/blog"
                    className={isActive('/blog') ? 'font-semibold text-blue-500' : 'text-gray-700'}
                >
                    Blog
                </Link>
                <Link
                    href="/contact"
                    className={isActive('/contact') ? 'font-semibold text-blue-500' : 'text-gray-700'}
                >
                    Contact
                </Link>
            </div>
        </nav>
    )
}
