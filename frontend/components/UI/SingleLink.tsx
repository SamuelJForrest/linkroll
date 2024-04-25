import Link from 'next/link';
import { FC } from 'react';
import styles from '@/sass/components/_links.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AuthTokenData } from '@/context/AuthContext';

type SingleLinkType = {
    title: string;
    link: string;
    author: AuthTokenData | null | undefined;
};

const SingleLink: FC<SingleLinkType> = ({ title, link, author }) => {
    const linkStyle = author ? styles['link'] : styles['link--user'];

    return (
        <div className={linkStyle}>
            <h2 className={styles['link-title']}>
                <Link href={link ? link : '#'}>{title}</Link>
            </h2>

            {author && (
                <Link
                    href={`/profile/${author?.id}`}
                    className={styles['link-author']}
                >
                    by <span>{author?.username}</span>
                </Link>
            )}

            <div className={styles['link-icon']}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </div>
    );
};

export default SingleLink;
