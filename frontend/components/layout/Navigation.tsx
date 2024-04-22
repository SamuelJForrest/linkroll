'use client';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import buttonStyles from '@/sass/components/_button.module.scss';
import styles from '@/sass/layout/_navigation.module.scss';
import SearchBar from '../UI/SearchBar';
import { useAuth } from '@/context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const Navigation = () => {
    const {
        isAuthenticated,
        setIsAuthenticated,
        logout,
        user,
        showMenu,
        setShowMenu,
        toggleMenu,
    } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        const closeMenu = (e: MouseEvent) => {
            const target = e.target;
            const menuTrigger = document.querySelector('.menuTrigger');
            const navSubMenu = document.querySelector(
                '.navSubMenu > a, .navSubMenu > button'
            );

            if (target != menuTrigger && target != navSubMenu) {
                setShowMenu(false);
            }
        };

        document.body.addEventListener('click', closeMenu);

        setShowMenu(false);

        return () => {
            document.body.removeEventListener('click', closeMenu);
        };
    }, [pathname]);

    return (
        <nav className={styles['nav']} aria-label="Primary Navigation">
            <Container>
                <Row>
                    <Col className="col-3 col-lg-4 d-flex align-items-center">
                        <Link href="/" className={styles['nav-logo']}>
                            Linkroll
                        </Link>
                    </Col>
                    <Col className="col-12 col-lg-4 d-flex align-items-center order-3 order-lg-2">
                        <SearchBar />
                    </Col>
                    <Col className="col-9 col-lg-4 order-2 order-lg-3">
                        <ul className={styles['nav-list']}>
                            <li className={styles['nav-item']}>
                                <Link href="/explore">Explore</Link>
                            </li>
                            <li
                                className={
                                    isAuthenticated ? styles['nav-item'] : ''
                                }
                            >
                                {isAuthenticated ? (
                                    <>
                                        Logged in as{' '}
                                        <button
                                            className="menuTrigger"
                                            onClick={toggleMenu}
                                            aria-expanded={showMenu}
                                        >
                                            {user?.username}
                                            {showMenu ? (
                                                <FontAwesomeIcon
                                                    icon={faChevronUp}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                />
                                            )}
                                        </button>
                                        {showMenu && (
                                            <ul className="navSubMenu">
                                                <Link
                                                    href={`/profile/${user?.id}`}
                                                >
                                                    View profile
                                                </Link>
                                                <button onClick={logout}>
                                                    Logout
                                                </button>
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        className={buttonStyles['button']}
                                    >
                                        Login
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </nav>
    );
};

export default Navigation;
