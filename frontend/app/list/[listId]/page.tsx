'use client';
import { ListType } from '@/app/profile/[profileId]/page';
import Banner from '@/components/layout/Banner';
import LinkList from '@/components/layout/LinkList';
import { useEffect, useState } from 'react';

type ListInfoType = {
    title: string;
    user?: {
        id: number;
        username: string;
    };
    list: ListType[];
};

export default function ListPage({ params }: { params: { listId: number } }) {
    const listId = params.listId;
    const [listInfo, setListInfo] = useState<ListInfoType>({
        title: 'List page',
        list: [],
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
                const { title } = data.list;
                const user = data.list_author;
                const lists = data.list_links;

                const listData: ListType[] = [];

                lists.forEach((list: ListType) => {
                    const { title, url, id } = list;

                    console.log(url);

                    listData.push({
                        title: title,
                        url,
                        id,
                    });
                });

                setListInfo(() => {
                    return {
                        title,
                        user: {
                            id: user.id,
                            username: user.username,
                        },
                        list: [...listData],
                    };
                });
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    };

    return (
        <main>
            <Banner title={listInfo.title} user={listInfo.user} />
            <LinkList list={listInfo.list} />
        </main>
    );
}
