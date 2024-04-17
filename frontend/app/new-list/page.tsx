'use client';
import ListForm from '@/components/UI/ListForm';
import Banner from '@/components/layout/Banner';
import { FlashMessageStatus, useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type userType = {
    username: string;
    id: number;
};

export default function NewListPage() {
    const { user, setflashMessage } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            router.push('/');
            setflashMessage({
                message: 'You need to be logged in to view this page.',
                status: FlashMessageStatus.Error,
            });
        }
    }, []);

    // useEffect(() => {
    //     fetchProfile();
    // }, []);

    // const fetchProfile = async (): Promise<void> => {
    //     try {
    //         const res = await fetch(
    //             `http://localhost:8000/api/profile/${profileId}`,
    //             {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             }
    //         );

    //         if (res.ok) {

    //         }
    //     } catch {
    //         console.log('catch');
    //     }
    // };

    return (
        <main>
            <Banner title="Add a new list" />
            <ListForm />
        </main>
    );
}
