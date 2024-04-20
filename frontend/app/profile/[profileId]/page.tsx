'use client';
import SingleLink from '@/components/UI/SingleLink';
import Banner from '@/components/layout/Banner';
import LinkList from '@/components/layout/LinkList';
import { useEffect, useState } from 'react';

type UserType = {
    username: string;
    id: number;
};

type ListType = {
    title: string;
    link: string;
    id: number;
};

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

    const linksMap = links.map((link, i) => {
        return (
            <SingleLink
                key={link.id}
                title={link.title}
                link={`/list/${link.id}`}
            />
        );
    });

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

            <LinkList>{linksMap}</LinkList>
        </main>
    );
}
