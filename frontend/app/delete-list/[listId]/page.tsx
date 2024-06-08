'use client';
import Banner from '@/components/layout/Banner';
import TextBlock from '@/components/layout/TextBlock';
import buttonStyles from '@/sass/components/_button.module.scss';

import { useEffect, useState } from 'react';

export default function DeleteListPage({
    params,
}: {
    params: { listId: number };
}) {
    const listId = params.listId;
    const [listDetails, setListDetails] = useState<ListDetailsType>({
        title: 'testing',
        id: 0,
    });

    useEffect(() => {
        fetchList();
    }, []);

    const fetchList = async (): Promise<void> => {
        try {
            const res = await fetch(
                `http://localhost:8000/api/list/${listId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (res.ok) {
                const data = await res.json();
                const { list } = data;

                setListDetails({
                    title: list.title,
                    id: list.id,
                });
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    };

    return (
        <main>
            <Banner title="Warning!" />
            <TextBlock title="Test">
                <p>
                    {`You are about to delete ${listDetails.title}, are you sure
                    you want to continue?`}
                </p>
                <button className={buttonStyles['button']}>Yes</button>
                <button className={buttonStyles['button--tertiary']}>No</button>
            </TextBlock>
        </main>
    );
}
