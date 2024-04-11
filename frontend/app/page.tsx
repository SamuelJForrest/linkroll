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
