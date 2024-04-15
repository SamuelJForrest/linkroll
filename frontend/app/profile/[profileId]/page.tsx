'use client';
import Banner from '@/components/layout/Banner';
import { useEffect, useState } from 'react';

type userType = {
    username: string;
    id: number;
};

export default function ProfilePage({
    params,
}: {
    params: { profileId: string };
}) {
    const [user, setUser] = useState<userType | null>(null);
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
                setUser(data);
            }
        } catch {
            console.log('catch');
        }
    };

    return <main>{user && <Banner title={user.username} />}</main>;
}
