import ListGroup from 'react-bootstrap/ListGroup';
import { PlusSquare } from 'react-bootstrap-icons';

export const Channels = ({ channels }) => {
    return (
        <>
            <div className="p-4 px-2 d-flex justify-content-between">
                <div className="fw-bold">Каналы</div>
                <PlusSquare color="blue" size={20} />
            </div>
            <div className="p-2">
                <ListGroup>
                    {channels.map((channel) => {
                        return (
                            <ListGroup.Item key={channel.id} className="bg-transparent border-0 px-0">
                                <button type="button" className="w-100 rounded-0 text-start btn btn-secondary ">
                                    # {channel.name}
                                </button>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </div>
        </>
    );
};
