import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { ArrowRightSquare, PlusSquare } from 'react-bootstrap-icons';

import { MainContainer } from './chatPage.styled';
import { getChatData } from '../../../store/commonThunks/index';
import { getIsChannelsLoading, getChannels } from '../../../store/channelsSlice/selectors';
import { getIsMessagesLoading } from '../../../store/messagesSlice/selectors';
import { AppSpinner } from '../../common/appSpinner';

const Main = () => {
    const dispatch = useDispatch();
    const isChannelsLoading = useSelector(getIsChannelsLoading);
    const isMessagesLoading = useSelector(getIsMessagesLoading);
    const channels = useSelector(getChannels);

    const isDataFetching = isChannelsLoading && isMessagesLoading;

    useEffect(() => {
        dispatch(getChatData());
    }, [dispatch]);

    return (
        <MainContainer>
            <Container className="rounded shadow h-100 bg-light">
                <Row className="h-100">
                    <Col className="col-4 col-xl-2 border-end">
                        <div className="p-4 px-2 d-flex justify-content-between border-bottom">
                            <div className="fw-bold">Каналы</div>
                            <PlusSquare color="blue" size={20} />
                        </div>
                        <div className="p-2">
                            <ListGroup
                                className="
"
                            >
                                {channels.map((channel) => {
                                    return (
                                        <ListGroup.Item key={channel.id} className="bg-transparent border-0">
                                            <button
                                                type="button"
                                                className="w-100 rounded-0 text-start btn btn-secondary "
                                            >
                                                # {channel.name}
                                            </button>
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                        </div>
                    </Col>
                    <Col className="col-8 col-xl-10 bg-white">
                        <div className="d-flex flex-column h-100">
                            <Row className="p-4 shadow-sm bg-light border-bottom">Хедер</Row>
                            <Row className="px-5 bg-white"> Сообщения</Row>
                            <Row className="px-5 py-3 bg-white mt-auto">
                                <form noValidate className="py-1 border rounded-2">
                                    <div className="input-group has-validation">
                                        <input
                                            name="body"
                                            aria-label="Новое сообщение"
                                            placeholder="Введите сообщение"
                                            className="border-0 ps-2 p-0 form-control"
                                        />
                                        <button type="submit" className="btn btn-group-vertical">
                                            <ArrowRightSquare size={20} />
                                        </button>
                                    </div>
                                </form>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
            {isDataFetching && <AppSpinner />}
        </MainContainer>
    );
};

export default Main;
