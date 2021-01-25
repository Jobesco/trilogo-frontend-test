import React from 'react';
import 'antd/dist/antd.css';
import { Card as Cartao, Col, Button, Menu, Dropdown, message } from 'antd';
import './Card.css'
import {SettingFilled} from '@ant-design/icons';

function Propimg(props){
    // TODO set image
    if(props.propimg){
        return (
            <div>oh yes</div>
        );
    }else{
        return (
            <div style={{display: 'none'}} />
        );
    }
}

// * PROPS:
// ? type: procedure, etc ("Bem", "Predial" e "Procedimento")
// ? number: ticket number
// ? description
// ? author: author of the ticket
function Card(props) {
    const menuCall = (e) => {
        if(e.key === 'edit'){
            message.info('janela de editar')
        }else{
            message.info('janela de deletar')
        }
    }

    const menu = (
        <Menu onClick={menuCall}>
          <Menu.Item key="edit">Editar</Menu.Item>
          <Menu.Item key="delete">Excluir</Menu.Item>
        </Menu>
      )

    let propimg = Propimg(props)
    return (
        // TODO add hook to @onPress
        <Cartao className="cardBody" bodyStyle={{padding: '0', display: 'flex'}}>
            {/* // TODO colourized pill */}
            <Col style={{float: 'left', padding: '0'}}>
                {propimg}

                <div style={{display: 'flex', marginBottom: '12px'}}>
                    <div className="cardType">{props.type}</div>
                </div>

                <div style={{flexDirection: 'row', alignItems: 'flex-start', display: 'flex'}}>{props.number}</div>

                <div style={{color: '#666666', minHeight: '44px',}}>{props.description}</div>

                {/* // TODO same line for text and button */}
                <div style={{float: 'left', color: '#1F1F49'}}>{props.author}</div>    
            </Col>
            
            {/* <Button type="text" icon={<SettingFilled />} style={{alignSelf: 'flex-end', margin: '0 0 0 auto', color: '#8D89A5'}} size='large' /> */}
            <Dropdown overlay={menu} style={{alignSelf: 'flex-end', margin: '0 0 0 auto', color: '#8D89A5'}} trigger={['click']}>
                <SettingFilled style={{alignSelf: 'flex-end', margin: '0 0 0 auto', color: '#8D89A5', padding: '0 0 5px 0'}}/>
            </Dropdown>

        </Cartao>
    );
}

export default Card;