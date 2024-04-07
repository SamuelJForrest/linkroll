import { FC, ReactNode } from 'react';
import styles from '@/sass/layout/_header.module.scss';

type HeaderProps = {
    children: ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => {
    return <header className={styles['header']}>{children}</header>;
};

export default Header;
