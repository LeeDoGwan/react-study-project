import {
    useEffect,
    useState,
} from 'react';
import {useNavigate} from 'react-router';
import './Hobby.css';

const HOBBIES = [
    {
        id: 1,
        title: 'Moon',
        description:
            '계기월식 진행 중일 때, 오산시 독산성에서',
        image: '/images/moon1.jpg',
    },
    {
        id: 2,
        title: 'Moon',
        description:
            '계기월식 진행',
        image: '/images/moon2.jpg',
    },
    {
        id: 3,
        title: 'Ski',
        description:
            '곤지암 스키장 상급자 코스 노을녘',
        image: '/images/ski1.jpg',
    },
    {
        id: 4,
        title: 'Ski',
        description:
            '곤지암 스키장 기념',
        image: '/images/ski2.jpg',
    },
    {
        id: 5,
        title: 'Camping',
        description:
            '캠핑 중 비행운',
        image: '/images/sky1.jpg',
    },
    {
        id: 6,
        title: 'the Milky way',
        description:
            '기억 안나는 은하수',
        image: '/images/star1.jpg',
    },
    {
        id: 7,
        title: 'Deep Sky',
        description:
            '말머리 성운 촬영',
        image: '/images/star2.jpg',
    },
    {
        id: 8,
        title: 'Deep Sky',
        description:
            '오리온 트라페지움 촬영',
        image: '/images/star3.jpg',
    },
    {
        id: 9,
        title: 'Star Cluster',
        description:
            '이름이 기억 안나는 구상성단 촬영',
        image: '/images/star4.jpg',
    },
];

function Hobby() {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/', {
            replace: true,
        });
    };
    // 클릭한 사진 정보
    const [selectedHobby, setSelectedHobby] =
        useState(null);

    const handleImageOpen = (hobby) => {
        setSelectedHobby(hobby);
    };

    const handleImageClose = () => {
        setSelectedHobby(null);
    };

    // 이미지 모달이 열려 있을 때 ESC로 닫기
    useEffect(() => {
        if (!selectedHobby) {
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                handleImageClose();
            }
        };

        window.addEventListener(
            'keydown',
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                'keydown',
                handleKeyDown,
            );
        };
    }, [selectedHobby]);

    return (
        <main className="Hobby">
            <button
                type="button"
                className="hobby-close"
                onClick={handleClose}
                aria-label="Close hobby page"
            >
                ×
            </button>

            <header className="hobby-header">
                <p className="hobby-path">
                    profile://myHome/hobby
                </p>

                <h1>Hobby Archive</h1>

                <p>
                    A collection of things I enjoy outside
                    of development.
                </p>
            </header>

            <section
                className="hobby-grid"
                aria-label="Hobby gallery"
            >
                {HOBBIES.map((hobby) => (
                    <article
                        key={hobby.id}
                        className="hobby-card"
                        tabIndex={0}
                        role="button"
                        onClick={() => {
                            handleImageOpen(hobby);
                        }}
                        onKeyDown={(event) => {
                            if (
                                event.key === 'Enter' ||
                                event.key === ' '
                            ) {
                                event.preventDefault();
                                handleImageOpen(hobby);
                            }
                        }}
                    >
                        <img className="hobby-image"
                            src={hobby.image}
                            alt={hobby.title}
                            loading="lazy"
                        />

                        <div className="hobby-card-overlay">
                            <div className="hobby-card-content">
                                <h2>{hobby.title}</h2>

                                <p>
                                    {hobby.description}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
            {/* 클릭한 이미지를 크게 표시 */}
            {selectedHobby && (
                <div
                    className="hobby-image-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selectedHobby.title} image`}
                    onMouseDown={handleImageClose}
                >
                    <div
                        className="hobby-image-modal-content"
                        onMouseDown={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        <button
                            type="button"
                            className="hobby-image-modal-close"
                            onClick={handleImageClose}
                            aria-label="Close image"
                        >
                            ×
                        </button>

                        <img
                            src={selectedHobby.image}
                            alt={selectedHobby.title}
                        />

                        <div className="hobby-image-modal-info">
                            <h2>
                                {selectedHobby.title}
                            </h2>

                            <p>
                                {
                                    selectedHobby.description
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Hobby;