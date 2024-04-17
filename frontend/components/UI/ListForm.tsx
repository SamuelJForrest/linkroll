import styles from '@/sass/components/_form.module.scss';
import buttonStyles from '@/sass/components/_button.module.scss';
import FormContainer from '../layout/FormContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

type FormData = {
    title: string;
    url: string;
}[];

const ListForm = () => {
    const [formData, setFormData] = useState<FormData>([
        {
            title: '',
            url: '',
        },
    ]);

    const newLinkHandler = () => {
        setFormData((prevData) => {
            return [...prevData, { title: '', url: '' }];
        });
    };

    const formDataMap = formData.map((data, i) => {
        return (
            <div className={styles['form-field']} key={i}>
                <label htmlFor="link-1-title">Link one title</label>
                <input type="text" name="link-1-title" id="link-1-title" />
                <label htmlFor="link-1-url">Link one URL</label>
                <input type="text" name="link-1-url" id="link-1-url" />
            </div>
        );
    });

    return (
        <FormContainer>
            <form className={styles['form']}>
                <div className={styles['form-wrap--links']}>
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
