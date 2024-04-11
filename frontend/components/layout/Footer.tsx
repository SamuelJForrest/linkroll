import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import styles from '@/sass/layout/_footer.module.scss';
import FooterMenu from './FooterMenu';

const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <Container>
                <Row>
                    <Col className="col-12 col-lg-6 d-flex flex-column justify-content-between align-items-start">
                        <h2>
                            <Link href="/" className={styles['footer-logo']}>
                                Linkroll
                            </Link>
                        </h2>
                        <p className={styles['footer-text']}>
                            Designed & Developed by{' '}
                            <Link
                                href="http://www.samueljamesforrest.com"
                                target="_blank"
                            >
                                Samuel James Forrest
                            </Link>
                        </p>
                    </Col>
                    <Col className="col-12 col-lg-2">
                        <FooterMenu
                            title="Footer menu one"
                            links={[{ text: 'Link one', url: '/' }]}
                        />
                    </Col>
                    <Col className="col-12 col-lg-2">
                        <FooterMenu
                            title="Footer menu one"
                            links={[
                                { text: 'Link two', url: '/' },
                                { text: 'Link three', url: '/' },
                                {
                                    text: 'Link four',
                                    url: 'https://www.google.com',
                                },
                            ]}
                        />
                    </Col>
                    <Col className="col-12 col-lg-2">
                        <FooterMenu
                            title="Footer menu one"
                            links={[{ text: 'test', url: '/' }]}
                        />
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
