import { FC } from 'react';
import { ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/sass/layout/_iconblocks.module.scss';

type IconBlocksProps = {
    title: string;
    children: ReactNode;
};

const IconBlocks: FC<IconBlocksProps> = ({ title, children }) => {
    return (
        <section className={styles['iconblock-container']}>
            <Container>
                <Row>
                    <Col className="col-12">
                        <h2 className={styles['iconblock-title']}>{title}</h2>

                        <div className={styles['iconblock-grid']}>
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default IconBlocks;
