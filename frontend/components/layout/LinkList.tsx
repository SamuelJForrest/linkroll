import { ReactNode, FC } from 'react';
import styles from '@/sass/components/_links.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import LinkListFilter from '../UI/LinkListFilter';
import SingleLink from '../UI/SingleLink';
import { ListType, UserType } from '@/app/profile/[profileId]/page';

type LinkListType = {
    list: ListType;
    altList?: boolean;
    user: UserType;
    filterLinks: () => void;
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
                        <ul className={listStyle}>{linksMap}</ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LinkList;
