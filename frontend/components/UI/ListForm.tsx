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

interface ListFormProps {
    initialFormData?: FormData;
    initialFormTitle?: string;
    listId?: number;
}

const ListForm = ({
    initialFormData,
    initialFormTitle,
    listId,
}: ListFormProps) => {
    const [formTitle, setFormTitle] = useState<string>('');
    const [formData, setFormData] = useState<FormData>(
        initialFormData || [{ title: '', url: '' }]
    );
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [submitAttempts, setSubmitAttempts] = useState<number>(0);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (initialFormTitle) {
            setFormTitle(initialFormTitle);
        }
    }, [initialFormTitle]);

    useEffect(() => {
        if (initialFormData) {
            setFormData(initialFormData);
        }
    }, [initialFormData]);

    useEffect(() => {
        if (formErrors.length === 0 && submitAttempts > 0) {
            submitForm();
        }
    }, [formErrors]);

    const submitForm = async (): Promise<void> => {
        try {
            const url = listId
                ? `http://localhost:8000/api/edit/${listId}`
                : 'http://localhost:8000/api/new-list';
            const method = listId ? 'PUT' : 'POST';

            const requestData = {
                user: user?.id,
                title: formTitle,
                data: formData,
            };

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (res.ok) {
                router.push(`/profile/${user?.id}`);
            } else {
                const errorData = await res.json();
                console.error('Error Response:', errorData);
                // Handle error response, e.g., set form errors
            }
        } catch (error) {
            console.error('Error:', error);
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

        formData.forEach((item, i) => {
            const { title, url } = item;

            if (!title || !url) {
                newErrors.push(
                    `Please ensure all fields are filled (Link ${i + 1}).`
                );
            }

            if (!url.startsWith('https://') && !url.startsWith('http://')) {
                newErrors.push(`Please enter a valid URL (Link ${i + 1})`);
            }
        });

        setFormErrors((prevErrors) => [...prevErrors, ...newErrors]);
        setSubmitAttempts((prevAttempts) => prevAttempts + 1);
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
                <label htmlFor={`title-${i}`}>Title</label>
                <input
                    type="text"
                    name="title"
                    id={`title-${i}`}
                    value={data.title}
                    onChange={(e) => inputHandler(e, i)}
                    required
                />
                <label htmlFor={`url-${i}`}>
                    URL{' '}
                    <span className={styles['form-helptext']}>
                        (please ensure all URLs start with
                        &lsquo;https://&rsquo; or &lsquo;http://&rsquo;)
                    </span>
                </label>
                <input
                    type="text"
                    name="url"
                    id={`url-${i}`}
                    value={data.url}
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
                            value={formTitle}
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
                        {listId ? 'Update list' : 'Create new list'}
                    </button>
                </div>
            </form>
        </FormContainer>
    );
};

export default ListForm;
