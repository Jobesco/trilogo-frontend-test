import React, { useState, useEffect, useRef} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Button, Row, Col, Typography, Divider, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Card from './components/Card/Card.js'
import TicketForm from './components/NewTicketForm/TicketForm.js'
import styles from './components/NewTicketForm/TicketForm.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getCRUD, getModalState } from './features/crud/crudSlice';
// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import {HTML5Backend} from "react-dnd-html5-backend";


const { Header, Content } = Layout;
const { Text } = Typography;

function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dbAbertos, setAbertos] = useState([]);
  const [dbExecutados, setExecutados] = useState([]);
  const [dbVistoriados, setVistoriados] = useState([]);
  const [dbArquivados, setArquivados] = useState([]);
  const db = useSelector(getCRUD)
  const modalState = useSelector(getModalState)
  const ref = useRef(null); // Initialize the reference


  useEffect(() => {
    console.log(db,'db change')
    // ? configura o array de chamados abertos
    setAbertos(db.map((item) => {
      if(item.data.estado === 'aberto'){
        return (
          <Card ref={ref} tipo={item.data.tipo} num={item.data.num} desc={item.data.desc} resp={item.data.resp} id={item.id} propimg={item.data.imagem} ></Card>
        )  
      }
    }))

    // ? configura o array de chamados executados
    setExecutados(db.map((item) => {
      if(item.data.estado === 'executado'){
        return (
          <Card ref={ref} tipo={item.data.tipo} num={item.data.num} desc={item.data.desc} resp={item.data.resp} id={item.id} propimg={item.data.imagem} ></Card>
        )  
      }
    }))

    // ? configura o array de chamados vistoriados
    setVistoriados(db.map((item) => {
      if(item.data.estado === 'vistoriado'){
        return (
          <Card ref={ref} tipo={item.data.tipo} num={item.data.num} desc={item.data.desc} resp={item.data.resp} id={item.id} propimg={item.data.imagem} ></Card>
        )  
      }
    }))

    // ? configura o array de chamados arquivados
    setArquivados(db.map((item) => {
      if(item.data.estado === 'arquivado'){
        return (
          <Card ref={ref} tipo={item.data.tipo} num={item.data.num} desc={item.data.desc} resp={item.data.resp} id={item.id} propimg={item.data.imagem} ></Card>
        )  
      }
    }))
  }, [db])

  useEffect(() => {
    console.log('modal state changed on App')
    setVisibleModal(false);
  }, [modalState])

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
    // console.log('Clicked cancel button');
    setVisibleModal(false);
  };

  const onDragEnd = result => {
    //TODO escrever
  };

  return (
    // TODO modal confirmando a mudança de coluna
    <Layout className="layout" style={{background: '#E5E5E5'}}>
      <Header style={{backgroundColor: '#FFFFFF', height: '80px', padding: '0 60px'}}>
        <Row justify="space-between" align="middle" style={{height: '100%'}}>
          Logo
          <Button style={{background: '#4C12A1'}} type="default" shape="round" size={'large'} icon={<PlusOutlined style={{color: 'white'}} />} onClick={showModal} >
            <div style={{color: 'white', display: 'inline'}}> Novo Ticket</div>
          </Button>
          
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
          <Row gutter={20} style={{height: '608px'}}>
    
            <Col span={6}>
              <div style={{background: '#FFFFFF', height: '100%', borderRadius: '8px'}}>
                <div style={{background: '#E9B4B7', borderRadius: '8px 8px 0px 0px', padding: '10px 0 10px 10px', height: '40px'}}>Abertos</div>

                <Col align="middle" className={styles.overflowCol}>
                  {dbAbertos}
                </Col>

              </div>
            </Col>

            <Col span={6}>
              <div style={{background: '#FFFFFF', height: '100%', borderRadius: '8px'}}>
                <div style={{background: '#F4D8CA', borderRadius: '8px 8px 0px 0px', padding: '10px 0 10px 10px', height: '40px'}}>Executados</div>

                <Col align="middle" className={styles.overflowCol}>
                  {dbExecutados}
                </Col>
              </div>
            </Col>
                  
            <Col span={6}>
              <div style={{background: '#FFFFFF', height: '100%', borderRadius: '8px'}}>
                <div style={{background: '#D3F0C5', borderRadius: '8px 8px 0px 0px', padding: '10px 0 10px 10px', height: '40px'}}>Vistoriados</div>

                <Col align="middle" className={styles.overflowCol}>
                  {dbVistoriados}
                </Col>
              </div>
              
            </Col>

            <Col span={6}>
              <div style={{background: '#FFFFFF', height: '100%', borderRadius: '8px'}}>
                <div style={{background: '#EFEDED', borderRadius: '8px 8px 0px 0px', padding: '10px 0 10px 10px', height: '40px'}}>Arquivados</div>

                <Col align="middle" className={styles.overflowCol}>
                  {dbArquivados}
                </Col>
              </div>
            </Col>
          </Row>
        </div>

      </Content>
    </Layout>
  );
}

export default App;
