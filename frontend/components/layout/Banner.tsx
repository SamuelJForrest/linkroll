import { FC } from 'react';
import styles from '../../sass/components/_banner.module.scss';
import { Container, Row, Col } from 'react-bootstrap';

type BannerProps = {
    title: string;
    text?: string;
    primaryButton?: boolean;
    secondaryButton?: boolean;
    homepageBanner?: boolean;
};

const Banner: FC<BannerProps> = ({
    title,
    text,
    primaryButton,
    secondaryButton,
    homepageBanner,
}) => {
    const bannerClass = homepageBanner ? styles['banner--home'] : styles.banner;

    return (
        <section className={bannerClass}>
            <Container>
                <Row>
                    <Col>
                        <div className={styles['banner-content']}>
                            <h1 className={styles['banner-title']}>{title}</h1>
                            {text && <p>{text}</p>}
                            {primaryButton && <p>Primary button</p>}
                            {secondaryButton && <p>Secondary button</p>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Banner;
