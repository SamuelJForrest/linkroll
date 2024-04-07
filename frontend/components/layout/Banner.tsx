import { FC } from 'react';
import Link from 'next/link';
import styles from '../../sass/components/_banner.module.scss';
import buttonStyles from '../../sass/components/_button.module.scss';
import { Container, Row, Col } from 'react-bootstrap';

type BannerProps = {
    title: string;
    text?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    homepageBanner?: boolean;
};

const Banner: FC<BannerProps> = ({
    title,
    text,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
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
                            {text && (
                                <p className={styles['banner-text']}>{text}</p>
                            )}
                            <div className={styles['banner-buttons']}>
                                {primaryButtonText && primaryButtonLink && (
                                    <Link
                                        href={primaryButtonLink}
                                        className={
                                            buttonStyles['button--outline']
                                        }
                                    >
                                        {primaryButtonText}
                                    </Link>
                                )}
                                {secondaryButtonText && secondaryButtonLink && (
                                    <Link
                                        href={secondaryButtonLink}
                                        className={
                                            buttonStyles['button--tertiary']
                                        }
                                    >
                                        {secondaryButtonText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Banner;
