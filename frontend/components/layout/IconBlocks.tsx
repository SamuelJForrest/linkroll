import { FC } from 'react';
import { ReactNode } from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from '@/sass/layout/_iconblocks.module.scss';

type IconBlocksProps = {
    title: string;
    children: ReactNode;
};

const IconBlocks: FC<IconBlocksProps> = ({ title, children }) => {
    return (
        <section>
            <Container>
                <Row>
                    <h2 className="visually-hidden">{title}</h2>

                    <div className={styles['iconblock-grid']}>{children}</div>
                </Row>
            </Container>
        </section>
    );
};

export default IconBlocks;
