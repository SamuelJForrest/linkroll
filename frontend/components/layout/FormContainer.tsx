import { FC, ReactNode } from 'react';
import styles from '@/sass/components/_form.module.scss';
import { Col, Container, Row } from 'react-bootstrap';

type FormContainerProps = {
    children: ReactNode;
};

const FormContainer: FC<FormContainerProps> = ({ children }) => {
    return (
        <section className={styles['form-container']}>
            <Container>
                <Row>
                    <Col className="col-md-10 col-lg-8 col-xl-6 mx-md-auto">
                        {children}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default FormContainer;
