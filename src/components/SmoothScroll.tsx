'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const handleHashChange = (url: string) => {
            const hash = url.split('#')[1];
            if (hash) {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        handleHashChange(window.location.href);
    }, [pathname]);

    return <>{children}</>;
}
