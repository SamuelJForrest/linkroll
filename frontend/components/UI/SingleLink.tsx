import Link from 'next/link';
import { FC } from 'react';
import styles from '@/sass/components/_links.module.scss';

type SingleLinkType = {
    title: string;
    link: string;
};

const SingleLink: FC<SingleLinkType> = ({ title, link }) => {
    return (
        <div className={styles['link']}>
            <h2 className={styles['link-title']}>
                <Link href={link ? link : '#'}>{title}</Link>
            </h2>
        </div>
    );
};

export default SingleLink;
