import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import buttonStyles from '@/sass/components/_button.module.scss';
import styles from '@/sass/layout/_navigation.module.scss';
import SearchBar from '../UI/SearchBar';

const Navigation = () => {
    return (
        <nav className={styles['nav']} aria-label="Primary Navigation">
            <Container>
                <Row>
                    <Col lg="4" className="d-flex align-items-center">
                        <Link href="/" className={styles['nav-logo']}>
                            Linkroll
                        </Link>
                    </Col>
                    <Col lg="4" className="d-flex align-items-center">
                        <SearchBar />
                    </Col>
                    <Col lg="4">
                        <ul className={styles['nav-list']}>
                            <li className={styles['nav-item']}>
                                <Link href="/">Explore</Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className={buttonStyles['button']}
                                >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </nav>
    );
};

export default Navigation;
