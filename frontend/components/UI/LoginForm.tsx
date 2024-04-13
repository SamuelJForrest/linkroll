'use client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import FormContainer from '../layout/FormContainer';
import styles from '@/sass/components/_form.module.scss';
import buttonStyles from '@/sass/components/_button.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

type LoginFormData = {
    username: string;
    password: string;
};

const LoginForm = () => {
    const [loginDetails, setLoginDetails] = useState<LoginFormData>({
        username: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [submitAttempts, setSubmitAttempts] = useState<number>(0);
    const { login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (formErrors.length === 0 && submitAttempts > 0) {
            submitForm();
        }
    }, [formErrors]);

    const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setFormErrors([]);

        const { username, password } = loginDetails;
        const newErrors: string[] = [];

        if (!username) {
            newErrors.push('Username is required');
        }

        if (!password) {
            newErrors.push('Password is required');
        }

        setFormErrors((prevErrors) => [...prevErrors, ...newErrors]);
        setSubmitAttempts((prevAttempts) => (prevAttempts += 1));
    };

    const submitForm = async (): Promise<void> => {
        try {
            const res = await fetch('http://localhost:8000/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(loginDetails).toString(),
            });

            if (res.ok) {
                const { access_token } = await res.json();
                login(access_token);
            } else {
                const data = await res.json();
                if (data.detail) {
                    setFormErrors((prevErrors) => [...prevErrors, data.detail]);
                } else {
                    setFormErrors([
                        'Failed to register. Please check your credentials and try again',
                    ]);
                }
            }
        } catch {
            console.log('catch');
        }
    };

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setLoginDetails({ ...loginDetails, [name]: value });
    };

    const errors = formErrors.map((error, i) => {
        return (
            <li className={styles['form-error']} key={i}>
                <FontAwesomeIcon icon={faX} />
                {error}
            </li>
        );
    });

    return (
        <FormContainer>
            <form onSubmit={submitHandler} className={styles['form']}>
                <div className={styles['form-wrap']}>
                    {formErrors.length > 0 && (
                        <ul className={styles['form-errors']}>{errors}</ul>
                    )}
                    <div className={styles['form-field']}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={loginDetails.username}
                            required
                            onChange={inputHandler}
                        />
                    </div>
                    <div className={styles['form-field']}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={loginDetails.password}
                            required
                            onChange={inputHandler}
                        />
                    </div>
                </div>
                <div className={styles['form-wrap--lower']}>
                    <p>
                        Don&apos;t have an account?{' '}
                        <Link href="/register">Register</Link>
                    </p>
                    <button type="submit" className={buttonStyles['button']}>
                        Login
                    </button>
                </div>
            </form>
        </FormContainer>
    );
};

export default LoginForm;
