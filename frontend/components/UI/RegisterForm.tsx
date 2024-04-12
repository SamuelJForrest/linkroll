'use client';
import FormContainer from '../layout/FormContainer';
import styles from '@/sass/components/_form.module.scss';
import buttonStyles from '@/sass/components/_button.module.scss';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type RegisterFormData = {
    username: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm = () => {
    const [registerDetails, setRegisterDetails] = useState<RegisterFormData>({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [submitAttempts, setSubmitAttempts] = useState<number>(0);

    useEffect(() => {
        if (formErrors.length === 0 && submitAttempts > 0) {
            submitForm();
        }
    }, [formErrors]);

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        setRegisterDetails({ ...registerDetails, [name]: value });
    };

    const submitHandler = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setFormErrors([]);
        const { username, password, confirmPassword } = registerDetails;
        const newErrors: string[] = [];

        if (!username) {
            newErrors.push('Username is required.');
        }

        if (!password) {
            newErrors.push('Password is required.');
        }

        if (password != confirmPassword) {
            newErrors.push('Passwords do not match');
        }

        setFormErrors((prevErrors) => [...prevErrors, ...newErrors]);
        setSubmitAttempts((prevAttempts) => (prevAttempts += 1));
    };

    const submitForm = async (): Promise<void> => {
        const { username, password } = registerDetails;
        try {
            const res = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                if (data.detail) {
                    setFormErrors((prevErrors) => [
                        ...prevErrors,
                        ...data.detail,
                    ]);
                } else {
                    setFormErrors([
                        'Failed to register. Please check your credentials and try again',
                    ]);
                }
            }
        } catch {
            console.log('lol');
        }
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
                            value={registerDetails.username}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className={styles['form-field']}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={registerDetails.password}
                            onChange={inputHandler}
                        />
                    </div>
                    <div className={styles['form-field']}>
                        <label htmlFor="confirmPassword">
                            Confirm password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={inputHandler}
                        />
                    </div>
                </div>
                <div className={styles['form-wrap--lower']}>
                    <p>
                        Already have an account?{' '}
                        <Link href="/login">Login</Link>
                    </p>
                    <button type="submit" className={buttonStyles['button']}>
                        Register
                    </button>
                </div>
            </form>
        </FormContainer>
    );
};

export default RegisterForm;
