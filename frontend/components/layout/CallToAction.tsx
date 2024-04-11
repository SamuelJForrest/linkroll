import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from '@/sass/layout/_calltoaction.module.scss';

type CallToActionProps = {
    text: string;
};

const CallToAction: FC<CallToActionProps> = ({ text }) => {
    return (
        <div className={styles['cta']}>
            <Container>
                <Row>
                    <Col className="col-lg-8 mx-lg-auto">
                        <p className={styles['cta-text']}>{text}</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CallToAction;
