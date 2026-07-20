import {useNavigate} from 'react-router';
import './Whoami.css';

const SKILLS = [
    'Java',
    'Kotlin',
    'Spring Boot',
    'Spring MVC',
    'Netty',
    'MariaDB',
    'Redis',
    'RabbitMQ',
    'JPA',
    'MyBatis',
    'Linux',
];

const ACHIEVEMENTS = [
    {
        value: '300s → <1s',
        title: 'Response-time improvement',
        description:
            'Separated server delivery and database persistence to remove a large traffic bottleneck.',
    },
    {
        value: '75%',
        title: 'Memory reduction',
        description:
            'Investigated database and server memory usage and resolved long-running stability problems.',
    },
    {
        value: '21 clients',
        title: 'Legacy system modernization',
        description:
            'Redesigned and modularized a legacy communication solution used by multiple clients.',
    },
];

function Whoami() {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/', {
            replace: true,
        });
    };

    return (
        <section className="Whoami">
            <button
                type="button"
                className="whoami-close"
                onClick={handleClose}
                aria-label="Close whoami page"
            >
                ×
            </button>

            <header className="whoami-header">
                <p className="whoami-path">
                    user://myHome/whoami
                </p>

                <h1>Who am I?</h1>

                <p>
                    Backend engineer focused on system
                    stability, performance, and root-cause
                    problem solving.
                </p>
            </header>

            <div className="whoami-content">
                <section className="whoami-profile">
                    <div className="whoami-avatar">
                        <img
                            src="/images/voltboy.jpeg"
                            alt="Profile"
                            onError={(event) => {
                                event.currentTarget.style.display =
                                    'none';
                            }}
                        />

                        <span>LDG</span>
                    </div>

                    <div className="whoami-summary">
                        <p className="whoami-command">
                            $ whoami
                        </p>

                        <h2>Lee Do-Gwan</h2>

                        <p className="whoami-role">
                            Backend Developer
                        </p>

                        <p className="whoami-description">
                            I design and improve backend
                            systems with an emphasis on
                            reliability, maintainability,
                            concurrency, and performance.
                        </p>

                        <dl className="whoami-info">
                            <div>
                                <dt>Role</dt>
                                <dd>Backend Developer</dd>
                            </div>

                            <div>
                                <dt>Focus</dt>
                                <dd>
                                    Platform · Network ·
                                    Performance
                                </dd>
                            </div>

                            <div>
                                <dt>Primary</dt>
                                <dd>
                                    Java · Kotlin · Spring
                                </dd>
                            </div>

                            <div>
                                <dt>Status</dt>
                                <dd className="whoami-status">
                                    Available
                                </dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <section className="whoami-section">
                    <div className="whoami-section-title">
                        <span>01</span>
                        <h2>About</h2>
                    </div>

                    <div className="whoami-text">
                        <p>
                            복잡한 장애를 단순히 우회하기보다
                            발생 원인을 추적하고 구조적으로
                            해결하는 것을 중요하게 생각합니다.
                        </p>

                        <p>
                            대규모 트래픽 처리, 데이터베이스
                            메모리 문제, 네트워크 통신 장애,
                            레거시 시스템 리팩토링 경험을
                            중심으로 백엔드 시스템을
                            개발해왔습니다.
                        </p>
                    </div>
                </section>

                <section className="whoami-section">
                    <div className="whoami-section-title">
                        <span>02</span>
                        <h2>Stack</h2>
                    </div>

                    <ul className="whoami-skills">
                        {SKILLS.map((skill) => (
                            <li key={skill}>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="whoami-section">
                    <div className="whoami-section-title">
                        <span>03</span>
                        <h2>Highlights</h2>
                    </div>

                    <div className="whoami-achievements">
                        {ACHIEVEMENTS.map((achievement) => (
                            <article
                                key={achievement.title}
                                className="whoami-achievement"
                            >
                                <strong>
                                    {achievement.value}
                                </strong>

                                <h3>
                                    {achievement.title}
                                </h3>

                                <p>
                                    {
                                        achievement.description
                                    }
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="whoami-section">
                    <div className="whoami-section-title">
                        <span>04</span>
                        <h2>Links</h2>
                    </div>

                    <nav
                        className="whoami-links"
                        aria-label="Profile links"
                    >
                        <a
                            href="https://github.com/LeeDoGwan"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span>GitHub</span>
                            <strong>↗</strong>
                        </a>

                    </nav>
                </section>
            </div>
        </section>
    );
}

export default Whoami;