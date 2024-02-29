import styles from './style.module.scss';
import { MessageFormValues } from "./../../model/types";
import { Form, Input, Button, Upload, FormInstance } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';

type IParams = {
  onSubmit: (values: MessageFormValues, form: FormInstance) => Promise<void>,
  onFileUpload: (options: any) => Promise<void>,
}

const MessageForm = ({ onSubmit, onFileUpload }: IParams) => {
  const [form] = Form.useForm();

  const onFinish = (values: MessageFormValues) => {
    onSubmit(values, form)
  };

  const customFileUpload = (options: any) => {
    onFileUpload(options)
  }

  return (
    <Form
      form={form}
      name="message-form"
      onFinish={onFinish}
      className={styles.InputArea}
      autoComplete='off'
    >

      <Form.Item
        name="message"
        className={styles.MessageInput}
      >
        <Input
          className={`${styles.InputMessage}  typography-b1`}
          placeholder="Type your message"
          style={{ width: `100%` }}
        />
      </Form.Item>

      <Form.Item
        className={styles.MessageActions}
      >
        {
          // @ts-ignore 
        <Upload
          accept='.jpeg, .jpg, .png, .pdf, .doc, .docx'
          showUploadList={false}
          customRequest={customFileUpload}
        >

          {
          // @ts-ignore 
          <PaperClipOutlined className={styles.AddButton} />
          }
        </Upload>}

        <Button
          htmlType="submit"
          className={styles.SendButton}
        >Send
        </Button>
      </Form.Item>

    </Form>
  )
}

export default MessageForm;
