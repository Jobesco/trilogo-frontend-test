import { Form, Input, Button, Select, Upload } from 'antd';
import styles from './TicketForm.module.css'
import './TicketForm.css'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';


const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    // offset: 8,
    // span: 16,
  },
};

const { Option } = Select;

function TicketForm(props) {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
        };

    return (
        <Form
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
            label="Descrição"
            name="descricao"
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
                    <Option value="bem">Bem</Option>
                    <Option value="predial">Predial</Option>
                    <Option value="procedimento">Procedimento</Option>
                </Select>
            </Form.Item>

            <Form.Item
            label="Responsável"
            name="responsavel"
            rules={[
                {
                required: true,
                message: 'Por favor, escolha um responsável!',
                },
            ]}
            className={styles.formItem}
            >
                <Select placeholder="Escolha" allowClear>
                    <Option value="fulano">Fulano</Option>
                    <Option value="sicrano">Sicrano</Option>
                    <Option value="beltrano">Beltrano</Option>
                </Select>
            </Form.Item>

            <Form.Item
            label="Imagem"
            name="imagem"
            valuePropName="fileList" getValueFromEvent={normFile}
            >
                <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon" style={{marginBottom: '0px'}}>
                    <InboxOutlined style={{color: '#4C12A1', marginBottom: '0px'}} />
                    </p>
                    <p className="ant-upload-text" style={{color: '#8B8B8B', marginBottom: '28px', height: '0px'}}>Arraste uma imagem para anexar ao ticket</p>
                </Upload.Dragger> 
            </Form.Item>

            {/* // TODO align button at end */}
            <Button style={{background: '#4C12A1', justifySelf: 'end', alignSelf: 'end'}} type="default" shape="round" size={'small'} >
                <div style={{color: 'white', display: 'inline'}}>Criar Ticket</div>
            </Button>
        </Form>
    );
}

export default TicketForm;