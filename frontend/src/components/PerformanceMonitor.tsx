import { useEffect } from 'react';

const PerformanceMonitor = () => {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    console.log(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
                });
            });

            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

            return () => observer.disconnect();
        }
    }, []);

    return null;
};

export default PerformanceMonitor; 