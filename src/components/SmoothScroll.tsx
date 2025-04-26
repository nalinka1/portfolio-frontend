'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        // Handle initial page load with hash
        const handleInitialScroll = () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 100); // Small delay to ensure DOM is ready
            }
        };

        // Handle navigation between pages with hashes
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const element = document.getElementById(hash);
                if (element) {
                    // Calculate offset for fixed header
                    const headerHeight = document.querySelector('header')?.clientHeight || 80;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: elementPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Scroll to top when no hash
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        handleInitialScroll();
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [pathname]);

    return <>{children}</>;
}
