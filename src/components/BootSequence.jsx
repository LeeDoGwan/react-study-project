import {useCallback} from 'react';
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
    // speed: 70,
    speed: 5,
    cursor: true,
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
    return (

        <section className="boot-screen">
            <TypeItRenderer
                className="boot-content"
                configure={configureBootAnimation}
                options={BOOT_TYPE_OPTIONS}
                onComplete={onComplete}
            />
        </section>
    );
}

export default BootSequence;