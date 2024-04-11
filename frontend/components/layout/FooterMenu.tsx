import { FC } from 'react';
import styles from '@/sass/layout/_footer.module.scss';
import Link from 'next/link';

type FooterMenuProps = {
    title: string;
    links: {
        text: string;
        url: string;
    }[];
};

const FooterMenu: FC<FooterMenuProps> = ({ title, links }) => {
    return (
        <nav className={styles['footer-menu']}>
            <h3 className={styles['footer-title']}>{title}</h3>
            <ul className={styles['footer-list']}>
                {links.map((link, index) => (
                    <li className={styles['footer-link']} key={index}>
                        <Link href={link.url}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default FooterMenu;
