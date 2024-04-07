import Banner from '@/components/layout/Banner';

export default function Home() {
    return (
        <main>
            <Banner
                title="Home"
                text="Lorem ipsum dolor sit amet, consectetur adipscing elit."
                homepageBanner={true}
            />
        </main>
    );
}
