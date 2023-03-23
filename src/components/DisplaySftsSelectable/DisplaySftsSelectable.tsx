import { Col } from 'react-bootstrap';
import { DisplaySft } from './DisplaySft';
import { observer } from 'mobx-react-lite';
import { Category } from '../../pages/MyCastle/store/SftStore';

export const DisplaySftsSelectable = observer(({sfts, category}: {sfts: any[], category?: Category}) => {
    return <>
        {sfts.map((sft, idx) => (
                <Col key={idx} xs={12} sm={4} md={3} className="mb-2">
                    <DisplaySft sft={sft} category={category} />
                </Col>
            ))}
    </>
});

