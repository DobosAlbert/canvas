import { observer } from 'mobx-react-lite';
import account from '../store/AccountStore';
import { Col, Card } from 'react-bootstrap';

export const DisplaySfts = observer((props: PropsType) => {
  const { sfts } = account;
  return (
    <>
      {sfts.map((sft) => (
        <Col sm={props.sm} md={props.md} key={sft.identifier} className='mb-2'>
          <Card onClick={() => props.func(sft)}>
            <Card.Img
              src={sft.url}
              style={{ borderRadius: '10px 10px 0 0' }}
            ></Card.Img>
            <Card.Header className='d-flex justify-content-between'>
              <span>{sft.name}</span>
              <span>x{sft.balance}</span>
            </Card.Header>
          </Card>
        </Col>
      ))}
    </>
  );
});

type PropsType = {
  xs?: number;
  sm?: number;
  md?: number;
  func: (arg1: any) => void;
};
