'use client';
import { ListType, UserType } from '@/app/profile/[profileId]/page';
import Banner from '@/components/layout/Banner';
import LinkList from '@/components/layout/LinkList';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const [list, setList] = useState<ListType[]>([]);
    const [userList, setUserList] = useState<ListType[]>([]);

    useEffect(() => {
        fetchList();
    }, []);

    const fetchList = async (): Promise<void> => {
        try {
            const res = await fetch(
                `http://localhost:8000/api/search/${q?.toLowerCase()}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (res.ok) {
                const data = await res.json();
                const { lists, users } = data;

                const userData: ListType[] = [];
                const listData: ListType[] = [];

                lists.forEach((list: ListType) => {
                    const { id, title } = list;

                    listData.push({
                        title,
                        url: `/list/${id}`,
                        id,
                    });
                });

                users.forEach((user: UserType) => {
                    const { id, username } = user;

                    userData.push({
                        title: username,
                        url: `/profile/${id}`,
                        id,
                    });
                });

                setList(listData);
                setUserList(userData);
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    };

    return (
        <main>
            <Banner title="Search page" text={`Showing results for '${q}'`} />
            <LinkList list={userList} title="Users" />
            <LinkList list={list} title="Lists" />
        </main>
    );
}
