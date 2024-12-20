import { Variants } from 'framer-motion';

export interface AnimationVariant extends Variants {
    initial: {
        opacity?: number;
        y?: number;
        scale?: number;
    };
    animate: {
        opacity?: number;
        y?: number;
        scale?: number;
    };
    transition?: {
        duration?: number;
        delay?: number;
        staggerChildren?: number;
    };
} 