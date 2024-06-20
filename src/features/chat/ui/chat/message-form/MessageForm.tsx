import { Form, Input, Button, Upload, FormInstance } from "antd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import { MessageFormValues } from "@/features/chat/model/types";

import styles from "./MessageForm.module.scss";

type IParams = {
  onSubmit: (values: MessageFormValues, form: FormInstance) => Promise<void>;
  onFileUpload: (options: any) => Promise<void>;
};

const MessageForm = ({ onSubmit, onFileUpload }: IParams) => {
  const [form] = Form.useForm();

  const onFinish = (values: MessageFormValues) => {
    onSubmit(values, form);
  };

  const customFileUpload = (options: any) => {
    onFileUpload(options);
  };

  return (
    <Form
      form={form}
      name='message-form'
      onFinish={onFinish}
      className={styles.MessageForm}
      layout='inline'
      autoComplete='off'
    >
      {/* <Form.Item
        name="file"
        className={styles.AttachFile}
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
      > */}
      <Upload accept='.jpeg, .jpg, .png, .pdf, .doc, .docx' showUploadList={false} customRequest={customFileUpload}>
        <Button type='link' icon={<PlusOutlined style={{ fontSize: "16px", color: "#08c" }} />} />
      </Upload>
      {/* </Form.Item> */}
      <Form.Item name='message' className={styles.MessageInput}>
        <Input placeholder='Type your message' bordered={false} style={{ color: "white", padding: "4px 11px" }} />
      </Form.Item>
      <Form.Item className={styles.SendButton}>
        <Button
          ghost
          htmlType='submit'
          style={{ color: "#B6BCC4", borderColor: "#B6BCC4" }}
          icon={<ArrowLeftOutlined style={{ fontSize: "16px", color: "#B6BCC4" }} />}
        />
      </Form.Item>
    </Form>
  );
};

export default MessageForm;
