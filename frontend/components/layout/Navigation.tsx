'use client';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import buttonStyles from '@/sass/components/_button.module.scss';
import styles from '@/sass/layout/_navigation.module.scss';
import SearchBar from '../UI/SearchBar';
import useAuthToken from '@/hooks/useAuthToken';

const Navigation = () => {
    const { hasAuthToken, authTokenData } = useAuthToken();

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
                                    hasAuthToken ? styles['nav-item'] : ''
                                }
                            >
                                {hasAuthToken ? (
                                    <>
                                        <p>
                                            Logged in as{' '}
                                            <Link href="/">
                                                {authTokenData?.username}
                                            </Link>
                                        </p>
                                        <Link href="/logout">Logout</Link>
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
