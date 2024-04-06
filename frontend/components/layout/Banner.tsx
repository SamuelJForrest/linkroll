import { FC } from 'react';
import styles from '../../sass/components/_banner.module.scss';

type BannerProps = {
    title: string;
    overrideClass?: string;
};

const Banner: FC<BannerProps> = ({ title, overrideClass }) => {
    const bannerClass = overrideClass
        ? styles[`${overrideClass}`]
        : styles.banner;

    return (
        <section className={bannerClass}>
            <h1 className={styles['banner-title']}>{title}</h1>
        </section>
    );
};

export default Banner;
