import { FC, ReactNode } from 'react';
import styles from '@/sass/layout/_iconblocks.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type IconBlockProps = {
    icon: IconProp;
    children: ReactNode;
};

const IconBlock: FC<IconBlockProps> = ({ icon, children }) => {
    return (
        <div className={styles['iconblock-item']}>
            <div className={styles['iconblock-icon']}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className={styles['iconblock-content']}>{children}</div>
        </div>
    );
};

export default IconBlock;
