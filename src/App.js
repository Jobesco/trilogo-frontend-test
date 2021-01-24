import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Button, Row, Col, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Text } = Typography;

function App() {
  return (
    <Layout className="layout" style={{background: '#E5E5E5'}}>
      <Header style={{backgroundColor: '#FFFFFF', height: '80px', padding: '0 60px'}}>
        <Row justify="space-between" align="middle" style={{height: '100%'}}>
          Logo
          <Button style={{background: '#4C12A1'}} type="default" shape="round" size={'large'} icon={<PlusOutlined style={{color: 'white'}}/>}>
            <div style={{color: 'white', display: 'inline'}}> Novo Ticket</div>
          </Button>  
        </Row>
        
      </Header>
      <Content style={{ padding: '0 50px', margin: '16px 0 16px 0', background: '#E5E5E5'}}>

        <div className="site-layout-content">
        {/* // * 4 columns */}
        {/* // TODO break into components for added reusability */}
        {/* // TODO typography */}
          <Row gutter={20}>
            <Col span={6} style={{height: '608px'}}>
              <div style={{background: '#FFFFFF', height: '100%', borderRadius: '8px'}}>
                <div style={{background: '#E9B4B7', borderRadius: '8px 8px 0px 0px', padding: '10px 0 10px 10px', height: '40px'}}>Abertos</div>  
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
