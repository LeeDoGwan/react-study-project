import { useEffect, useRef } from 'react';
import TypeIt from 'typeit';

function TypeItRenderer({
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

        configure(instance);

        instance.go();

        return () => {
            instance.destroy();
            element.innerHTML = '';
        };
    }, [configure, options, onComplete]);

    return (
        <div
            ref={elementRef}
            className={className}
        />
    );
}

export default TypeItRenderer;