import { FC, ReactNode } from 'react';
import styles from '@/sass/layout/_textblock.module.scss';
import { Col, Container, Row } from 'react-bootstrap';

type TextBlockProps = {
    title: string;
    children: ReactNode;
};

const TextBlock: FC<TextBlockProps> = ({ title, children }) => {
    return (
        <section className={styles['textblock']}>
            <Container>
                <Row>
                    <Col lg="10" className="mx-lg-auto">
                        <h2 className={styles['textblock-title']}>{title}</h2>
                        <div className={styles['textblock-content']}>
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TextBlock;
