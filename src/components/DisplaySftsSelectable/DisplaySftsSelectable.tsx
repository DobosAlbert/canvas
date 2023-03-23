import { Col } from 'react-bootstrap';
import { DisplaySft } from './DisplaySft';
import { observer } from 'mobx-react-lite';

export const DisplaySftsSelectable = observer(({sfts}: {sfts: any[]}) => {
    return <>
        {sfts.map((sft, idx) => (
                <Col key={idx} xs={12} sm={4} md={3} className="mb-2">
                    <DisplaySft sft={sft} />
                </Col>
            ))}
    </>
});

