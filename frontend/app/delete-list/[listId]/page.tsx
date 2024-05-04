'use client';
import { ListType } from '@/app/profile/[profileId]/page';
import Banner from '@/components/layout/Banner';
import LinkList from '@/components/layout/LinkList';
import { useEffect, useState } from 'react';

type ListDetailsType = {
    title: string;
    id: number;
};

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
            <Banner
                title="Warning!"
                text={`You are about to delete ${listDetails.title}, are you sure you want to continue?`}
            />
        </main>
    );
}
