import { useEffect, useRef } from 'react';
import TypeIt from 'typeit';

function BootSequence({ onComplete }) {
    const textRef = useRef(null);
    useEffect(() => {
        const typeIt = new TypeIt(
            textRef.current,
            {
                speed: 30,
                cursor: false,
                afterComplete: () => {
                    onComplete();
                },
            },
        );

        typeIt
            .type('Ubuntu 24.04 LTS')
            .break()
            .type('Starting portfolio shell...')
            .go();

        return () => {
            typeIt.destroy();
        };
    }, []);
    return (
        <section>
            <div ref={textRef} />
        </section>
    );
}

export default BootSequence;