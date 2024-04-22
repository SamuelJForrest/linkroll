import { FC, ChangeEvent } from 'react';
import styles from '@/sass/components/_links.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import LinkListFilter from '../UI/LinkListFilter';
import SingleLink from '../UI/SingleLink';
import { ListType } from '@/app/profile/[profileId]/page';
import { AuthTokenData } from '@/context/AuthContext';

type LinkListType = {
    list: ListType[];
    altList?: boolean;
    user: AuthTokenData | null;
    filterLinks: (e: ChangeEvent<HTMLInputElement>) => void;
};

const LinkList: FC<LinkListType> = ({ list, user, altList, filterLinks }) => {
    const listStyle = altList ? styles['link-list--alt'] : styles['link-list'];

    const linksMap = list.map((link, i) => {
        return (
            <li key={link.id}>
                <SingleLink
                    title={link.title}
                    link={`/list/${link.id}`}
                    author={user}
                />
            </li>
        );
    });

    return (
        <div className={styles['link-wrapper']}>
            <Container>
                <Row>
                    <Col>
                        <LinkListFilter filterLinks={filterLinks} />

                        {list.length > 0 ? (
                            <ul className={listStyle}>{linksMap}</ul>
                        ) : (
                            <p className={styles['link-noresults']}>
                                No results, please refine your search query
                            </p>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LinkList;
