import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface TextTypeProps {
    text: string;
    typingSpeed?: number;
    startOnVisible?: boolean;
    showCursor?: boolean;
    loop?: boolean;
    variableSpeed?: boolean;
    onSentenceComplete?: () => void;
    className?: string;
}

export default function TextType({
    text,
    typingSpeed = 50,
    startOnVisible = true,
    showCursor = true,
    loop = false,
    variableSpeed = false,
    onSentenceComplete,
    className = '',
}: TextTypeProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (startOnVisible && !isInView) return;

        let currentIndex = 0;
        setIsTyping(true);
        setDisplayedText('');

        const typeChar = () => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;

                let speed = typingSpeed;
                if (variableSpeed) {
                    // Add some randomness to typing speed
                    speed = typingSpeed + Math.random() * 50 - 25;
                }

                setTimeout(typeChar, speed);
            } else {
                setIsTyping(false);
                if (onSentenceComplete) onSentenceComplete();

                if (loop) {
                    setTimeout(() => {
                        currentIndex = 0;
                        setDisplayedText('');
                        setIsTyping(true);
                        typeChar();
                    }, 2000);
                }
            }
        };

        typeChar();

        return () => {
            // Cleanup if needed
        };
    }, [text, typingSpeed, startOnVisible, isInView, loop, variableSpeed, onSentenceComplete]);

    return (
        <span ref={ref} className={className}>
            {displayedText}
            {showCursor && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
                />
            )}
        </span>
    );
}
