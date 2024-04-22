'use client';
import Banner from '@/components/layout/Banner';
import { useEffect, useState } from 'react';
import { UserType } from '../profile/[profileId]/page';
import Link from 'next/link';

export default function ExplorePage() {
    const [userProfiles, setUserProfiles] = useState<UserType[]>([]);

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
                setUserProfiles(data);
            }
        } catch {
            console.log('catch');
        }
    };

    return (
        <main>
            <Banner
                title="Explore"
                text="Lorem ipsum dolor sit amet, consectetur adipscing elit."
                primaryButtonText="Primary button"
                primaryButtonLink="/"
            />

            {userProfiles.map((profile, i) => {
                return (
                    <div key={i}>
                        <Link href={`/profile/${profile.id}`}>
                            {profile.username}
                        </Link>
                    </div>
                );
            })}
        </main>
    );
}
