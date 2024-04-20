'use client';
import SingleLink from '@/components/UI/SingleLink';
import Banner from '@/components/layout/Banner';
import LinkList from '@/components/layout/LinkList';
import { ChangeEvent, useEffect, useState } from 'react';

type UserType = {
    username: string;
    id: number;
};

type ListType = {
    title: string;
    link: string;
    id: number;
}[];

export default function ProfilePage({
    params,
}: {
    params: { profileId: number };
}) {
    const [user, setUser] = useState<UserType | null>(null);
    const [links, setLinks] = useState<ListType[]>([]);
    const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false);
    const profileId = params.profileId;

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async (): Promise<void> => {
        try {
            const res = await fetch(
                `http://localhost:8000/api/profile/${profileId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (res.ok) {
                const data = await res.json();
                const { user_profile, user_lists } = data;

                setUser(user_profile);
                setLinks(user_lists);

                if (user_profile.id === Number(profileId)) {
                    setIsLoggedInUser(true);
                }
            }
        } catch {
            console.log('catch');
        }
    };

    const filterLinks = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const { value } = e.target;

        console.log(value);
    };

    return (
        <main>
            {user &&
                (isLoggedInUser ? (
                    <Banner
                        title={user.username}
                        primaryButtonLink="/new-list"
                        primaryButtonText="New list"
                    />
                ) : (
                    <Banner title={user.username} />
                ))}

            <LinkList
                list={links}
                user={user}
                altList={true}
                filterLinks={filterLinks}
            />
        </main>
    );
}

export type { ListType, UserType };
