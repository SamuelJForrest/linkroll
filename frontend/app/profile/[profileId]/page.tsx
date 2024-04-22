'use client';
import SingleLink from '@/components/UI/SingleLink';
import Banner from '@/components/layout/Banner';
import LinkList from '@/components/layout/LinkList';
import { useAuth } from '@/context/AuthContext';
import { ChangeEvent, useEffect, useState } from 'react';

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
    const [userProfile, setUserProfile] = useState<UserType>();
    const [links, setLinks] = useState<ListType[]>([]);
    const [filteredLinks, setFilteredLinks] = useState<ListType[]>([]);
    const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false);
    const profileId = params.profileId;
    const { user } = useAuth();

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

                setUserProfile(user_profile);
                setLinks(user_lists);
                setFilteredLinks(user_lists);

                if (user?.id === Number(profileId)) {
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

        setFilteredLinks(
            links.filter((link) => link.title.toLowerCase().includes(value))
        );
    };

    return (
        <main>
            {userProfile &&
                (isLoggedInUser ? (
                    <>
                        <Banner
                            title={userProfile.username}
                            primaryButtonLink="/new-list"
                            primaryButtonText="New list"
                        />
                    </>
                ) : (
                    <Banner title={userProfile.username} />
                ))}
            <LinkList
                list={filteredLinks}
                user={user}
                altList={true}
                filterLinks={filterLinks}
            />
        </main>
    );
}

export type { ListType, UserType };
