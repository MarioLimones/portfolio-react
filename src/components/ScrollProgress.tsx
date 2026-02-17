import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

function ScrollProgressComponent() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    return (
        <motion.div
            className="scroll-progress"
            style={{ scaleX }}
            aria-hidden="true"
        />
    )
}

const ScrollProgress = React.memo(ScrollProgressComponent)
export default ScrollProgress
