import { useEffect, useRef } from 'react';
import TypeIt from 'typeit';

function TypeItRenderer({
                            text,
                            command,
                            output,
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
        } else if (command !== undefined) { // Terminal의 명령어 실행 결과
            //ldg0819 명령줄 먼저 출력
            instance.type(command, {
                instant: true,
            });

            //ldg0819결과값 별도 출력
            output.forEach((line) => {
                instance
                    .break()
                    .type(line);
            });
        }

        if (text !== undefined && text !== null) {
            instance.type(text);
        }
        instance.go();

        return () => {
            instance.destroy();
            element.innerHTML = '';
        };
    }, [text, command, output, configure, options, onComplete]);

    return (
        <div
            ref={elementRef}
            className={className}
        />
    );
}

export default TypeItRenderer;