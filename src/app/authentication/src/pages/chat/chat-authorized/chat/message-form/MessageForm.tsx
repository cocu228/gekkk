import { useState, useRef, ChangeEvent } from 'react';
import styles from './style.module.scss';
import { MessageFormValues } from '../../model/types';
import { MutableRef } from 'preact/hooks';

type IParams = {
  onSubmit: (values: MessageFormValues, form: MutableRef<HTMLFormElement>) => Promise<void>,
  onFileUpload: (file: File) => Promise<void>,
}

const MessageForm = ({ onSubmit, onFileUpload }: IParams) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ message, file:files }, form);
    setMessage('');
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      onFileUpload(file);
      setFiles([...files, file])
    }
  }

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      className={styles.InputArea}
      autoComplete='off'
    >
      <div className={styles.MessageInput}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          className={`${styles.InputMessage}  typography-b1`}
          placeholder="Type your message"
          style={{ width: `100%` }}
        />
      </div>

      <div className={styles.MessageActions}>
        <input
          type="file"
          accept='.jpeg, .jpg, .png, .pdf, .doc, .docx'
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />

        <button
          type="submit"
          className={styles.SendButton}
        >
          Send
        </button>
      </div>
    </form>
  )
}

export default MessageForm;