import {useCallback, useEffect, useRef} from 'react';
import './BootSequence.css';
import TypeItRenderer from "./TypeItRenderer.jsx";

const bootTxtLine = [
    'OS: Backend GNU/Linux',
    'Host: LeeDoGwan@github',
    'Role: Backend Engineer',
    'Kernel: Java 11 / Spring Boot 2.7',
    'Shell: root-cause-first',
    'Focus: performance, reliability, networking',
    'Status: building maintainable systems'
]
const BOOT_TYPE_OPTIONS = {
    speed: 100,
    cursor: false,
};
function BootSequence({ onComplete }) {


    const configureBootAnimation = useCallback(
        (instance) => {
            bootTxtLine.forEach((line) => {
                instance
                    .type(line, {instant: true})
                    .break()
                    .pause(800);
            });
            instance.break()
                .type('loading')
                .pause(100).type('.').pause(100).type('.')
                .pause(100).type('.').pause(100).type('.')
                .pause(100).type('.').pause(100).type('.')
                .break();

            instance.delete()
                .type('Rocky Linux 10')
                .break()
                .type('Starting myHome shell...')
                .pause(1000);

    }, []);
    // useEffect(() => {
    //     const typeIt = new TypeIt(
    //         textRef.current,
    //         {
    //             speed: 50,
    //             cursor: false,
    //             afterComplete: () => {
    //                 onComplete();
    //             },
    //         },
    //     );
    //
    //     typeIt
    //         .type('OS: Backend GNU/Linux').break()
    //         .type('Host: LeeDoGwan@github').break()
    //         .type('Role: Backend Engineer').break()
    //         .type('Kernel: Java 11 / Spring Boot 2.7').break()
    //         .type('Shell: root-cause-first').break()
    //         .type('Focus: performance, reliability, networking').break()
    //         .type('Status: building maintainable systems').break()
    //         .pause(1000);
    //
    //     typeIt
    //         .type('loading')
    //         .pause(100).type('.').pause(100).type('.')
    //         .pause(100).type('.').pause(100).type('.')
    //         .pause(100).type('.').pause(100).type('.')
    //         .break()
    //
    //
    //     typeIt.delete()
    //         .type('Rocky Linux 10')
    //         .break()
    //         .type('Starting myHome shell...')
    //         .pause(1000)
    //         .go();
    //
    //     return () => {
    //         typeIt.destroy();
    //     };
    // }, []);
    return (

        <section className="boot-screen">
            <TypeItRenderer
                className="boot-content"
                configure={configureBootAnimation}
                options={BOOT_TYPE_OPTIONS}
                onComplete={onComplete}
            />
            {/*<div ref={textRef} className="boot-content" />*/}
        </section>
    );
}

export default BootSequence;