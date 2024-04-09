import { FC, ReactNode } from 'react';
import styles from '@/sass/layout/_iconblocks.module.scss';

type IconBlockProps = {
    icon: string;
    children: ReactNode;
};

const IconBlock: FC<IconBlockProps> = () => {
    return (
        <div className={styles['iconblock']}>
            <div className={styles['iconblock-icon']}></div>
        </div>
    );
};

export default IconBlock;
