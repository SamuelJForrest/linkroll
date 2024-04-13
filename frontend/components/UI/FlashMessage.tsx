'use client';
import { FC } from 'react';
import styles from '@/sass/components/_flashmessage.module.scss';
import { useAuth } from '@/context/AuthContext';

const FlashMessage: FC = () => {
    const { flashMessage } = useAuth();

    if (flashMessage == null) return;

    const { status, message } = flashMessage;

    return (
        <div className={styles[`flash--${status.toLowerCase()}`]}>
            <p className={styles['flash-title']}>{status}</p>
            <p className={styles['flash-message']}>{message}</p>
        </div>
    );
};

export default FlashMessage;
