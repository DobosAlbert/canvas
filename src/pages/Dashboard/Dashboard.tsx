import { PageLayout } from 'components/PageLayout';
import { Col, Row } from 'react-bootstrap';
import PixiComponent from '../NewPixi';


export const Dashboard = () => {
  return (
    <PageLayout>
       <Row className=''>
            <PixiComponent>
           </PixiComponent>  
      </Row> 
    </PageLayout>
  );
};
