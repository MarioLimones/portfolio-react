import React from 'react'
import { motion } from 'framer-motion'

type AnimatedSectionProps = {
    children: React.ReactNode
    className?: string
    id?: string
    delay?: number
}

const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay,
            ease: [0.2, 0.8, 0.2, 1],
        },
    }),
}

function AnimatedSectionComponent({ children, className = '', id, delay = 0 }: AnimatedSectionProps) {
    return (
        <motion.section
            id={id}
            className={className}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            custom={delay}
        >
            {children}
        </motion.section>
    )
}

const AnimatedSection = React.memo(AnimatedSectionComponent)
export default AnimatedSection
