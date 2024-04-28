import Banner from '@/components/layout/Banner';
import IconBlock from '@/components/layout/IconBlock';
import IconBlocks from '@/components/layout/IconBlocks';
import TextBlock from '@/components/layout/TextBlock';
import Link from 'next/link';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import CallToAction from '@/components/layout/CallToAction';

export default function HomePage() {
    return (
        <main>
            <Banner
                title="Welcome to Linkroll"
                text="Lorem ipsum dolor sit amet, consectetur adipscing elit."
                primaryButtonText="Get Started"
                primaryButtonLink="/register/"
                secondaryButtonText="View API"
                secondaryButtonLink="/docs/"
                homepageBanner={true}
            />
            <TextBlock title="Introducing Linkroll: Your Personal Link Curation Companion">
                <p>
                    Linkroll is your go-to web application for effortlessly
                    curating your personalized reading lists from the vast
                    expanse of the internet. With Linkroll, organizing your
                    favorite online resources has never been easier. Seamlessly
                    collect, categorize, and manage links that pique your
                    interest, ensuring you never lose track of valuable
                    articles, insightful blog posts, or captivating videos
                    again. Whether it&apos;s for research, leisure, or learning,
                    Linkroll empowers you to create curated collections tailored
                    to your interests and preferences. Say goodbye to scattered
                    bookmarks and hello to a streamlined, organized approach to
                    internet browsing with Linkroll.
                </p>
            </TextBlock>
            <IconBlocks title="features">
                <IconBlock icon={faBook}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Assumenda ab nesciunt corrupti quo optio nam quod
                        praesentium omnis accusantium aperiam, molestias a
                        earum! Sapiente atque porro blanditiis nulla illum
                        tenetur!
                    </p>
                </IconBlock>
                <IconBlock icon={faBook}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Assumenda ab nesciunt corrupti quo optio nam quod
                        praesentium omnis accusantium aperiam, molestias a
                        earum! Sapiente atque porro blanditiis nulla illum
                        tenetur!
                    </p>
                </IconBlock>
                <IconBlock icon={faBook}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Assumenda ab nesciunt corrupti quo optio nam quod
                        praesentium omnis accusantium aperiam, molestias a
                        earum! Sapiente atque porro blanditiis nulla illum
                        tenetur!
                    </p>
                </IconBlock>
                <IconBlock icon={faBook}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Assumenda ab nesciunt corrupti quo optio nam quod
                        praesentium omnis accusantium aperiam, molestias a
                        earum! Sapiente atque porro blanditiis nulla illum
                        tenetur!
                    </p>
                </IconBlock>
            </IconBlocks>
            <CallToAction text="This is the statement block, it tells you something interesting about the service or product." />
        </main>
    );
}
