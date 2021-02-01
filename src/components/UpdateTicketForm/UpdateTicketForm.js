import { Form, Input, Button, Select, Upload, notification } from 'antd';
import styles from './UpdateTicketForm.module.css'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { update } from '../../features/crud/crudSlice';

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

function UpdateTicketForm(props) {
    const dispatch = useDispatch()

    const openNotificationWithIcon = type => {
      notification[type]({
        message: type == 'success' ? 'Sucesso!' : 'Erro!',
        description:
          type == 'success' ? 'Ocorrência alterada com sucesso!' : 'Por favor, tente novamente mais tarde. :(',
      });
    };

    const onFinish = (values) => {
      values.id = props.id
      values.num = props.num
      dispatch(update(values))
      // console.log(values, 'valores atualizando')
      console.log('terminei')
      openNotificationWithIcon('success')
    };
    
    const onFinishFailed = () => {
      openNotificationWithIcon('error')
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
        initialValues={{
          desc: props.desc,
          tipo: props.tipo,
          resp: props.resp,
          // imagem: props.imagem == null ? 0 : props.imagem 
        }}
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
        valuePropName="fileList" getValueFromEvent={normFile}
        >
          <Upload.Dragger multiple>
              <p className="ant-upload-drag-icon" style={{marginBottom: '0px'}}>
              <InboxOutlined style={{color: '#4C12A1', marginBottom: '0px'}} />
              </p>
              <p className="ant-upload-text" style={{color: '#8B8B8B', marginBottom: '28px', height: '0px'}}>Arraste uma imagem para anexar ao ticket</p>
          </Upload.Dragger> 
        </Form.Item>

        
        {/* // TODO align button at end */}
        <Button style={{background: '#4C12A1', justifySelf: 'end', alignSelf: 'end'}} type="default" shape="round" size={'small'} htmlType="submit">
          <div style={{color: 'white', display: 'inline'}}>Atualizar Ticket</div>
        </Button>
      </Form>
    );
}

export default UpdateTicketForm;