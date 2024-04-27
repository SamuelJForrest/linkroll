import Link from 'next/link';
import { FC } from 'react';
import styles from '@/sass/components/_links.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AuthTokenData } from '@/context/AuthContext';

type SingleLinkType = {
    title: string;
    url: string;
    author: AuthTokenData | null | undefined;
};

const SingleLink: FC<SingleLinkType> = ({ title, url, author }) => {
    const linkStyle = author ? styles['link'] : styles['link--user'];

    // @TODO: Add in function to check if a link is to an external page or not - also include BE validation for this when a user saves a link!

    return (
        <div className={linkStyle}>
            <h2 className={styles['link-title']}>
                <Link href={url}>{title}</Link>
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
