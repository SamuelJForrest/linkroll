import Banner from '@/components/layout/Banner';
import IconBlock from '@/components/layout/IconBlock';
import IconBlocks from '@/components/layout/IconBlocks';
import TextBlock from '@/components/layout/TextBlock';
import Link from 'next/link';
import {
    faBook,
    faCalendar,
    faFolder,
    faGlobe,
} from '@fortawesome/free-solid-svg-icons';
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
                <IconBlock icon={faFolder}>
                    <h3>Efficient Organization of Links</h3>
                    <p>
                        An app designed for creating lists of links can greatly
                        improve how you manage and access online resources. By
                        allowing you to categorize links into various lists,
                        such as work, personal interests, research, or shopping,
                        the app ensures that you can quickly find and use the
                        links you need. This organized approach helps streamline
                        your online activities and reduces the time spent
                        searching for important links.
                    </p>
                </IconBlock>
                <IconBlock icon={faBook}>
                    <h3>Research and Information Gathering</h3>
                    <p>
                        For students, researchers, or professionals who need to
                        gather information from various online sources, this app
                        is invaluable. You can create dedicated lists for
                        different projects or subjects, making it easy to
                        compile and organize all relevant links in one place.
                        This structured collection of resources facilitates
                        efficient research and helps ensure that no critical
                        information is overlooked. An icon of a book can be
                        associated with this feature to symbolize knowledge and
                        research.
                    </p>
                </IconBlock>
                <IconBlock icon={faCalendar}>
                    <h3>Planning and Task Management</h3>
                    <p>
                        Another significant use of creating lists of links is
                        for planning and task management. Whether you are
                        organizing a trip, planning an event, or managing a
                        project, you can save all related links in specific
                        lists. This could include accommodation options, travel
                        itineraries, suppliers, or resources needed for task
                        completion. Having all these links organized in one
                        place helps in better planning and ensures you have
                        quick access to necessary information. An icon of a
                        calendar can represent this feature, highlighting its
                        utility in planning and organization.
                    </p>
                </IconBlock>
                <IconBlock icon={faGlobe}>
                    <h3>Social Sharing and Collaboration</h3>
                    <p>
                        The app also offers social features that allow you to
                        share your link lists with friends, colleagues, or
                        project teams. You can follow what others are
                        bookmarking, exchange recommendations, and collaborate
                        on shared lists for group projects or common interests.
                        These social interactions enhance the usefulness of the
                        app by enabling collective knowledge sharing and
                        discovery of new resources. An icon of a globe can be
                        associated with this feature, representing connectivity
                        and collaboration.
                    </p>
                </IconBlock>
            </IconBlocks>
            <CallToAction text="This is the statement block, it tells you something interesting about the service or product." />
        </main>
    );
}
