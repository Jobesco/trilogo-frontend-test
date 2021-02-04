import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Card as Cartao, Col, Image, Menu, Dropdown, message, Modal } from 'antd';
import {SettingFilled} from '@ant-design/icons';
import styles from './Card.module.css'
import UpdateTicketForm from '../UpdateTicketForm/UpdateTicketForm'
// import { getModalState } from '../../features/generalSlice'
import { deleteCRUD, getModalState, changeState } from '../../features/crud/crudSlice'
import { useSelector, useDispatch } from 'react-redux'

function Propimg(props){
    // TODO set image
    if(props.propimg){
        return (
            <div>
                <Image src={props.propimg} height={104} width={213} />
            </div>
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
// ! se não tem a prop image, é pq n enviou image
function Card(props) {
    const [visibleModal, setVisibleModal] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const modalState = useSelector(getModalState)
    const dispatch = useDispatch()


    const menuCall = (e) => {
        if(e.key === 'edit'){
            setVisibleModal(true)
        }else if(e.key === 'delete'){
            dispatch(deleteCRUD(props.id))
            message.info('Deletado com sucesso!')
        }else{
            dispatch(changeState({estado: e.key, id: props.id}))
            message.info('Alterado com sucesso!')
        }
    }

    const handleCancel = () => {
        // console.log('Clicked cancel button');
        setVisibleModal(false);
    };

    useEffect(() => {
        console.log('modal state changed on Card')
        setVisibleModal(false);
    }, [modalState])

    const { SubMenu } = Menu

    const menu = (
        <Menu onClick={menuCall}>
            <Menu.Item key="edit">Editar</Menu.Item>
            <Menu.Item key="delete">Excluir</Menu.Item>
            <SubMenu title="Alterar Estado">
                <Menu.Item key="aberto">Abertos</Menu.Item>
                <Menu.Item key="executado">Executados</Menu.Item>
                <Menu.Item key="vistoriado">Vistoriados</Menu.Item>
                <Menu.Item key="arquivado">Arquivados</Menu.Item>
            </SubMenu>
        </Menu>
    );

    let propimg = Propimg(props)
    return (
        // TODO add hook to @onPress
        // TODO show image
        // TODO enlarge image on click
        <Cartao className={styles.cardBody} bodyStyle={{padding: '0', display: 'flex'}}>
            {/* // TODO fix font. why it isnt roboto like the figma is? */}
            <Col style={{float: 'left', padding: '0'}}>
                {propimg}

                <div style={{display: 'flex', marginBottom: '12px', marginTop: '10px'}}>
                    <div className={styles.cardType}>{props.tipo}</div>
                </div>

                <div className={styles.cardNumber}>{props.num}</div>

                <div style={{color: '#666666', minHeight: '44px', textAlign: 'left'}}>{props.desc}</div>

                {/* // TODO same line for text and button */}
                <div style={{float: 'left', color: '#1F1F49'}}>{props.resp}</div>    
            </Col>
            
            {/* <Button type="text" icon={<SettingFilled />} style={{alignSelf: 'flex-end', margin: '0 0 0 auto', color: '#8D89A5'}} size='large' /> */}
            <Dropdown overlay={menu} style={{alignSelf: 'flex-end', margin: '0 0 0 auto', color: '#8D89A5'}} trigger={['click']}>
                <SettingFilled style={{alignSelf: 'flex-end', margin: '0 0 0 auto', color: '#8D89A5', padding: '0 0 5px 0'}}/>
            </Dropdown>

            <Modal
                title="Atualizar ticket"
                visible={visibleModal}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                bodyStyle={{padding: '0 16px 16px 16px', borderRadius: '4px', height:'528px'}}
                className={styles.modal}
                footer={null}
            >
                <UpdateTicketForm style={{height: '528px'}} desc={props.desc} tipo={props.tipo} resp={props.resp} imagem={props.propimg} id={props.id} num={props.num} estado={props.estado} />
            </Modal>
        </Cartao>
    );
}

export default Card;