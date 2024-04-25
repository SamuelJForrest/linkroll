'use client';
import Banner from '@/components/layout/Banner';
import { ChangeEvent, useEffect, useState } from 'react';
import { ListType, UserType } from '../profile/[profileId]/page';
import LinkList from '@/components/layout/LinkList';

export default function ExplorePage() {
    const [userProfiles, setUserProfiles] = useState<UserType[]>([]);
    const [userList, setUserList] = useState<ListType[]>([]);
    const [filteredUserList, setFilteredUserList] = useState<ListType[]>([]);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async (): Promise<void> => {
        try {
            const res = await fetch('http://localhost:8000/api/explore', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                const data = await res.json();

                const listData: ListType[] = [];

                data.forEach((data: UserType) => {
                    const { username, id } = data;

                    listData.push({
                        title: username,
                        link: `/profile/${id}`,
                        id,
                    });
                });

                setUserProfiles(data);
                setUserList(listData);
                setFilteredUserList(listData);
            }
        } catch {
            console.log('catch');
        }
    };

    const filterLinks = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const { value } = e.target;

        setFilteredUserList(
            userList.filter((user) =>
                user.title.toLowerCase().includes(value.trim())
            )
        );
    };

    return (
        <main>
            <Banner
                title="Explore"
                text="Lorem ipsum dolor sit amet, consectetur adipscing elit."
                primaryButtonText="Primary button"
                primaryButtonLink="/"
            />

            <LinkList
                list={filteredUserList}
                userList={true}
                filterLinks={filterLinks}
            />
        </main>
    );
}
