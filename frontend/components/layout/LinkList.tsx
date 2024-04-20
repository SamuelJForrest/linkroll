import { ReactNode, FC } from 'react';
import styles from '@/sass/components/_links.module.scss';
import { Col, Container, Row } from 'react-bootstrap';

type LinkListType = {
    children: ReactNode;
    altList?: boolean;
};

const LinkList: FC<LinkListType> = ({ children, altList }) => {
    const listStyle = altList ? styles['link-list--alt'] : styles['link-list'];

    return (
        <div className={styles['link-wrapper']}>
            <Container>
                <Row>
                    <Col>
                        <ul className={listStyle}>{children}</ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LinkList;
