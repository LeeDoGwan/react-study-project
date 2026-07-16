import { useEffect, useRef } from 'react';
import TypeIt from 'typeit';

function TypeItRenderer({
                            text,
                            configure,
                            options = {},
                            onComplete,
                            className,
                        }) {
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;

        element.innerHTML = '';

        const instance = new TypeIt(element, {
            ...options,
            afterComplete: onComplete,
        });
        if (configure) {
            configure(instance);
        }

        if (text !== undefined && text !== null) {
            instance.type(text);
        }
        instance.go();

        return () => {
            instance.destroy();
            element.innerHTML = '';
        };
    }, [text, configure, options, onComplete]);

    return (
        <div
            ref={elementRef}
            className={className}
        />
    );
}

export default TypeItRenderer;