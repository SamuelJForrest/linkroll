'use client';
import Banner from '@/components/layout/Banner';
import TextBlock from '@/components/layout/TextBlock';
import buttonStyles from '@/sass/components/_button.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FlashMessageStatus, useAuth } from '@/context/AuthContext';

type ListDetailsType = {
    title: string;
    id: number;
    userId: number;
};

export default function DeleteListPage({
    params,
}: {
    params: { listId: number };
}) {
    const listId = params.listId;
    const [listDetails, setListDetails] = useState<ListDetailsType>({
        title: 'Fetching list...',
        id: 0,
        userId: 0,
    });
    const router = useRouter();
    const { setflashMessage } = useAuth();

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
                    userId: list.user_id,
                });
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    };

    const deleteList = async (): Promise<void> => {
        try {
            const res = await fetch(
                `http://localhost:8000/api/delete/${listId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (res.ok) {
                // Redirect to the user's profile page after successful deletion
                router.push(`/profile/${listDetails.userId}`);
                setflashMessage({
                    message: `You have successfully deleted ${listDetails.title}`,
                    status: FlashMessageStatus.Success,
                });
            } else {
                console.error('Failed to delete the list');
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
                    {`You are about to delete '${listDetails.title}', are you sure
                    you want to continue?`}
                </p>
            </TextBlock>
            <div className={buttonStyles['button-wrap--marginbottom']}>
                <button
                    className={buttonStyles['button--warning']}
                    onClick={deleteList}
                >
                    Yes
                </button>
                <Link
                    href={`/profile/${listDetails.userId}`}
                    className={buttonStyles['button--tertiary-dark']}
                >
                    No, go back
                </Link>
            </div>
        </main>
    );
}
