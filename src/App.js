import React, { useState, useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Button, Row, Col, Typography, Divider, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Card from './components/Card/Card.js'
import TicketForm from './components/NewTicketForm/TicketForm.js'
import styles from './components/NewTicketForm/TicketForm.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getCRUD, create, update, deleteCRUD } from './features/crud/crudSlice';
import store from './app/store';

const { Header, Content } = Layout;
const { Text } = Typography;

function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [realDB, setRealDB] = useState([]);
  const db = useSelector(getCRUD)

  useEffect(() => {
    console.log(db,'db change')
    setRealDB(db.map((item) => {
      return <Card type={item.tipo} number={item.num} description={item.desc} author={item.resp} id={item.id} num={item.num}></Card>
    }))
    // store.subscribe(() => {
    //   // if(realDB.length != store.getState().crud.length)
    //   console.log(db,'db changed?')
    // })
  }, [db])

  const showModal = () => {
    setVisibleModal(true)
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisibleModal(false);
  };

  return (
    <Layout className="layout" style={{background: '#E5E5E5'}}>
      <Header style={{backgroundColor: '#FFFFFF', height: '80px', padding: '0 60px'}}>
        <Row justify="space-between" align="middle" style={{height: '100%'}}>
          Logo
          <Button style={{background: '#4C12A1'}} type="default" shape="round" size={'large'} icon={<PlusOutlined style={{color: 'white'}} />} onClick={showModal} >
            <div style={{color: 'white', display: 'inline'}}> Novo Ticket</div>
          </Button>
          {/* // TODO close modal on success */}
          <Modal
            title="Novo ticket"
            visible={visibleModal}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            bodyStyle={{padding: '0 16px 16px 16px', borderRadius: '4px', height:'528px'}}
            className={styles.modal}
            footer={null}
          >
            <TicketForm style={{height: '528px'}}/>
          </Modal>
        </Row>
        
      </Header>
      <Divider style={{padding: '0', margin: '0'}} />

      <Content style={{ padding: '0 50px', margin: '16px 0 16px 0', background: '#E5E5E5'}}>

        <div className="site-layout-content">
        {/* // * 4 columns */}
        {/* // TODO break into components for added reusability */}
        {/* // TODO typography */}
          <Row gutter={20}>
            <Col span={6} style={{height: '608px'}}>
              <div style={{background: '#FFFFFF', height: '100%', borderRadius: '8px'}}>
                <div style={{background: '#E9B4B7', borderRadius: '8px 8px 0px 0px', padding: '10px 0 10px 10px', height: '40px'}}>Abertos</div>

                {/* // TODO change to a lazy list */}
                <Col align="middle" style={{padding: '10px 0 0 0'}}>
                  {realDB}
                </Col>
                
              </div>
              
            </Col>
            
            <Col span={6}>
              <div style={{background: '#FFFFFF', height: '100%', borderRadius: '8px'}}>
                <div style={{background: '#F4D8CA', borderRadius: '8px 8px 0px 0px', padding: '10px 0 10px 10px', height: '40px'}}>Executados</div>
              </div>
            </Col>

            <Col span={6}>
              <div style={{background: '#FFFFFF', height: '100%', borderRadius: '8px'}}>
                <div style={{background: '#D3F0C5', borderRadius: '8px 8px 0px 0px', padding: '10px 0 10px 10px', height: '40px'}}>Vistoriados</div>
              </div>
            </Col>

            <Col span={6}>
              <div style={{background: '#FFFFFF', height: '100%', borderRadius: '8px'}}>
                <div style={{background: '#EFEDED', borderRadius: '8px 8px 0px 0px', padding: '10px 0 10px 10px', height: '40px'}}>Arquivados</div>
              </div>
            </Col>
          </Row>
        </div>

      </Content>
    </Layout>
  );
}

export default App;
