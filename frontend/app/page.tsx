import Banner from '@/components/layout/Banner';

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
        </main>
    );
}
