import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/sass/layout/_banner.module.scss';
import buttonStyles from '@/sass/components/_button.module.scss';
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
    const bannerBackground = homepageBanner
        ? '/images/backgrounds/homepage-banner-bg.svg'
        : '/images/backgrounds/banner-bg.svg';

    return (
        <section className={bannerClass}>
            <Container>
                <Row>
                    <Col lg="7">
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

            <div className={styles['banner-background']}>
                <Image
                    src={bannerBackground}
                    alt=""
                    width="1440"
                    height={homepageBanner ? '600' : '500'}
                />
            </div>

            {homepageBanner && (
                <div className={styles['banner-background--shape']}>
                    <Image
                        src="/images/backgrounds/banner-shape.svg"
                        alt=""
                        width="548"
                        height="400"
                    />
                </div>
            )}
        </section>
    );
};

export default Banner;
