import { AnimationVariant } from './types';

export const fadeIn: AnimationVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
};

export const slideUp: AnimationVariant = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export const scaleIn: AnimationVariant = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
};

export const staggerContainer: AnimationVariant = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}; 