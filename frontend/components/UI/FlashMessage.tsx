'use client';
import { FC, useEffect } from 'react';
import styles from '@/sass/components/_flashmessage.module.scss';
import { useAuth } from '@/context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const FlashMessage: FC = () => {
    const { flashMessage, setflashMessage } = useAuth();

    if (flashMessage == null) return;

    const { status, message } = flashMessage;

    return (
        <div className={styles[`flash--${status.toLowerCase()}`]}>
            <div className={styles['flash-titlewrap']}>
                <p className={styles['flash-title']}>{status}</p>
                <button
                    className={styles['flash-close']}
                    onClick={() => setflashMessage(null)}
                >
                    <FontAwesomeIcon icon={faX} />
                    <span className={styles['flash-close-text']}>Close</span>
                </button>
            </div>
            <p className={styles['flash-message']}>{message}</p>
        </div>
    );
};

export default FlashMessage;
