import { Form, Input, Button, Select, Upload, notification } from 'antd';
import styles from './TicketForm.module.css'
import './TicketForm.css'
import { InboxOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { create, change } from '../../features/crud/crudSlice';
import { useState } from 'react'
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
// const tailLayout = {
//   wrapperCol: {
//     // offset: 8,
//     // span: 16,
//   },
// };

const { Option } = Select;

function TicketForm(props) {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [fileList2, setFileList] = useState([])

    const openNotificationWithIcon = type => {
        notification[type]({
          message: type === 'success' ? 'Sucesso!' : 'Erro!',
          description:
            type === 'success' ? 'Ocorrência enviada com sucesso!' : 'Por favor, tente novamente mais tarde. :(',
        });
      };

    const onFinish = (values) => {
        if(values.imagem){
            const reader = new FileReader()
            reader.readAsDataURL(values.imagem)
            reader.onload = function() {
                // console.log(reader.result);
                values.imagem = reader.result
                values.num = 6523
                values.estado = 'aberto'
                dispatch(create(values))
                dispatch(change())
                form.resetFields();
                setFileList([])
                openNotificationWithIcon('success')
                console.log('created!') 
            };
            
            reader.onerror = function() {
                console.log(reader.error);
                values.imagem = undefined
            };    
        }else{
            values.num = 6523
            values.estado = 'aberto'
            dispatch(create(values))
            dispatch(change())
            form.resetFields();
            setFileList([])
            openNotificationWithIcon('success')
            console.log('created!')   
        }
        
        console.log(values,'values')
        
    };
    
    const onFinishFailed = () => {
        openNotificationWithIcon('error')
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            console.log('isarray')
            return e.slice(-1)[0].originFileObj;
        }
        if (e.fileList.length !== 0) return e && e.fileList.slice(-1)[0].originFileObj;
        else return e
    };

    const manualRequest = ({e, onSuccess}) => {
        // console.log('this is a test')
        // console.log(e)
        onSuccess('ok')
    }

    const handleChange = info => {
        let fileList = [...info.fileList];
        
        // 1. Limit the number of uploaded files
        // Only to show one recent uploaded file, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url;
          }
          return file;
        });
        
        setFileList(fileList)
      };

    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
        >
            <Form.Item
            label="Descrição"
            name="desc"
            rules={[
                {
                required: true,
                message: 'Por favor, insira uma descrição!',
                },
            ]}
            className={styles.formItem}
            >
                <Input style={{borderRadius: '4px', border: '1px solid #D9D9D9'}} placeholder="Descreva" />
            </Form.Item>

            <Form.Item
            label="Tipo"
            name="tipo"
            rules={[
                {
                required: true,
                message: 'Por favor, escolha um tipo de ocorrência!',
                },
            ]}
            className={styles.formItem}
            >
                <Select placeholder="Escolha" allowClear>
                    <Option value="Bem">Bem</Option>
                    <Option value="Predial">Predial</Option>
                    <Option value="Procedimento">Procedimento</Option>
                </Select>
            </Form.Item>

            <Form.Item
            label="Responsável"
            name="resp"
            rules={[
                {
                required: true,
                message: 'Por favor, escolha um responsável!',
                },
            ]}
            className={styles.formItem}
            >
                <Select placeholder="Escolha" allowClear>
                    <Option value="Fulano">Fulano</Option>
                    <Option value="Sicrano">Sicrano</Option>
                    <Option value="Beltrano">Beltrano</Option>
                </Select>
            </Form.Item>

            <Form.Item
            label="Imagem"
            name="imagem"
            valuePropName="fileList2" getValueFromEvent={normFile}
            >
                <Upload.Dragger accept="image/*" customRequest={manualRequest} onChange={handleChange} fileList={fileList2}>
                    <p className="ant-upload-drag-icon" style={{marginBottom: '0px'}}>
                    <InboxOutlined style={{color: '#4C12A1', marginBottom: '0px'}} />
                    </p>
                    <p className="ant-upload-text" style={{color: '#8B8B8B', marginBottom: '28px', height: '0px'}}>Arraste uma imagem para anexar ao ticket</p>
                </Upload.Dragger> 
            </Form.Item>

            {/* // TODO align button at end */}
            <Button style={{background: '#4C12A1', justifySelf: 'end', alignSelf: 'end'}} type="default" shape="round" size={'small'} htmlType="submit">
                <div style={{color: 'white', display: 'inline'}}>Criar Ticket</div>
            </Button>
        </Form>
    );
}

export default TicketForm;