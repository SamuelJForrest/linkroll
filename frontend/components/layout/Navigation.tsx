'use client';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import buttonStyles from '@/sass/components/_button.module.scss';
import styles from '@/sass/layout/_navigation.module.scss';
import SearchBar from '../UI/SearchBar';
import { useAuth } from '@/context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Navigation = () => {
    const {
        isAuthenticated,
        setIsAuthenticated,
        logout,
        user,
        showMenu,
        toggleMenu,
    } = useAuth();

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
                                            <ul>
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
