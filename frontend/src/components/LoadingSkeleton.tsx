import { Box, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Header */}
                <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
                
                {/* Content */}
                <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="70%" />
            </motion.div>
        </Box>
    );
};

export default LoadingSkeleton; 