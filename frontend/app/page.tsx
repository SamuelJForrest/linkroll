import Banner from '@/components/layout/Banner';
import TextBlock from '@/components/layout/TextBlock';
import Link from 'next/link';

export default function Home() {
    return (
        <main>
            <Banner
                title="Welcome to Linkroll"
                text="Lorem ipsum dolor sit amet, consectetur adipscing elit."
                primaryButtonText="Primary button"
                primaryButtonLink="/"
                secondaryButtonText="View API"
                secondaryButtonLink="/api/"
                homepageBanner={true}
            />
            <TextBlock title="This is the main header">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut{' '}
                    <Link href="/">aliquip ex ea commodo consequat</Link>. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </TextBlock>
        </main>
    );
}
