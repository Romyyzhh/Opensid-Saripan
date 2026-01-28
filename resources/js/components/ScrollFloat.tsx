import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollFloatProps {
    children: string;
    animationDuration?: number;
    ease?: string;
    scrollStart?: string;
    scrollEnd?: string;
    stagger?: number;
    containerClassName?: string;
    textClassName?: string;
}

export default function ScrollFloat({
    children,
    animationDuration = 1,
    ease = 'back.inOut(2)',
    scrollStart = 'center bottom+=50%',
    scrollEnd = 'bottom bottom-=40%',
    stagger = 0.03,
    containerClassName = '',
    textClassName = '',
}: ScrollFloatProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Split by newlines first to preserve structure
    const lines = children.split('\n');

    return (
        <div ref={containerRef} className={`${containerClassName}`}>
            {lines.map((line, lineIndex) => (
                <div key={lineIndex} className="block mb-1">
                    {line.split(' ').map((word, wordIndex) => {
                        // Calculate a unique index for staggering across all words
                        const globalIndex = lineIndex * 10 + wordIndex;

                        return (
                            <Word
                                key={`${lineIndex}-${wordIndex}`}
                                word={word}
                                progress={scrollYProgress}
                                index={globalIndex}
                                stagger={stagger}
                                className={textClassName}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

function Word({ word, progress, index, stagger, className }: any) {
    const start = Math.min(0.1 + (index * stagger), 0.8);
    const end = Math.min(start + 0.3, 1);

    const opacity = useTransform(progress, [start, end], [0, 1]);
    const y = useTransform(progress, [start, end], [20, 0]);

    return (
        <motion.span
            style={{ opacity, y }}
            className={`inline-block mr-[0.25em] ${className}`}
        >
            {word}
        </motion.span>
    );
}
