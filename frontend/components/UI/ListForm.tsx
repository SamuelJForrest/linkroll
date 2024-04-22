import styles from '@/sass/components/_form.module.scss';
import buttonStyles from '@/sass/components/_button.module.scss';
import FormContainer from '../layout/FormContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useEffect, useState } from 'react';
import { FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

type FormData = {
    title: string;
    url: string;
}[];

const ListForm = () => {
    const [formTitle, setFormTitle] = useState<string>('');
    const [formData, setFormData] = useState<FormData>([
        {
            title: '',
            url: '',
        },
    ]);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [submitAttempts, setSubmitAttempts] = useState<number>(0);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (formErrors.length === 0 && submitAttempts > 0) {
            submitForm();
        }
    }, [formErrors]);

    const submitForm = async (): Promise<void> => {
        try {
            const res = await fetch('http://localhost:8000/api/new-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user?.id,
                    title: formTitle,
                    data: formData,
                }),
            });

            if (res.ok) {
                router.push(`/profile/${user?.id}`);
            } else {
                // const data = await res.json();
                // if (data.detail) {
                //     setFormErrors((prevErrors) => [...prevErrors, data.detail]);
                // } else {
                //     setFormErrors(['Something went wrong, please try again.']);
                // }
            }
        } catch {
            console.log('catch');
        }
    };

    const newLinkHandler = () => {
        setFormData((prevData) => {
            return [...prevData, { title: '', url: '' }];
        });
    };

    const inputHandler = (
        e: ChangeEvent<HTMLInputElement>,
        index: number
    ): void => {
        const { name, value } = e.target;

        setFormData((prevData) => {
            return prevData.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        [name]: value,
                    };
                }
                return item;
            });
        });
    };

    const updateTitleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;

        setFormTitle(value);
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setFormErrors([]);

        const newErrors: string[] = [];

        if (!formTitle) {
            newErrors.push('Your list must have a title');
        }

        formData.map((item, i) => {
            const { title, url } = item;

            if (!title || !url) {
                newErrors.push(
                    `Please ensure all fields are filled (Link ${i + 1}).`
                );
            }
        });

        setFormErrors((prevErrors) => [...prevErrors, ...newErrors]);
        setSubmitAttempts((prevAttempts) => (prevAttempts += 1));
    };

    const errors = formErrors.map((error, i) => {
        return (
            <li className={styles['form-error']} key={i}>
                <FontAwesomeIcon icon={faX} />
                {error}
            </li>
        );
    });

    const formDataMap = formData.map((data, i) => {
        return (
            <fieldset className={styles['form-field']} key={i}>
                <legend>Link {i + 1}</legend>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={(e) => inputHandler(e, i)}
                    required
                />
                <label htmlFor="url">URL</label>
                <input
                    type="text"
                    name="url"
                    id="url"
                    onChange={(e) => inputHandler(e, i)}
                    required
                />
            </fieldset>
        );
    });

    return (
        <FormContainer>
            <form className={styles['form']} onSubmit={submitHandler}>
                <div className={styles['form-wrap--links']}>
                    {formErrors.length > 0 && (
                        <ul className={styles['form-errors']}>{errors}</ul>
                    )}
                    <div className={styles['form-field']}>
                        <label htmlFor="list-title">List Title</label>
                        <input
                            type="text"
                            name="list-title"
                            id="list-title"
                            onChange={updateTitleHandler}
                            required
                        />
                    </div>
                    {formDataMap}
                    <button
                        type="button"
                        className={buttonStyles['button']}
                        onClick={newLinkHandler}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add another link
                    </button>
                </div>
                <div className={styles['form-wrap--lower']}>
                    <button type="submit" className={buttonStyles['button']}>
                        Create new list
                    </button>
                </div>
            </form>
        </FormContainer>
    );
};

export default ListForm;
