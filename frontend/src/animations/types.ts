import { Target, Transition } from 'framer-motion';

export interface AnimationVariant {
    initial: Target;
    animate: Target;
    transition?: Transition;
} 