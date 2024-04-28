import { FC, ChangeEvent } from 'react';
import styles from '@/sass/components/_links.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import LinkListFilter from '../UI/LinkListFilter';
import SingleLink from '../UI/SingleLink';
import { ListType } from '@/app/profile/[profileId]/page';
import { UserType } from '@/app/profile/[profileId]/page';
import { AuthTokenData } from '@/context/AuthContext';

type LinkListType = {
    title?: string;
    list: ListType[];
    altList?: boolean;
    user?: AuthTokenData | null | undefined;
    filterLinks?: (e: ChangeEvent<HTMLInputElement>) => void;
    newTab?: boolean;
};

const LinkList: FC<LinkListType> = ({
    title,
    list,
    user,
    altList,
    filterLinks,
    newTab,
}) => {
    const listStyle = altList ? styles['link-list--alt'] : styles['link-list'];

    const linksMap = list.map((link) => {
        return (
            <li key={link.id}>
                <SingleLink
                    title={link.title}
                    url={link.url}
                    author={user}
                    newTab={newTab}
                />
            </li>
        );
    });

    return (
        <div className={styles['link-wrapper']}>
            <Container>
                <Row>
                    <Col>
                        {filterLinks && (
                            <LinkListFilter filterLinks={filterLinks} />
                        )}

                        {title && (
                            <h2 className={styles['link-heading']}>{title}</h2>
                        )}

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
