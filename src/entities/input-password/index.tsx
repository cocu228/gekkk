import React from 'react';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {Button, Input, Space} from 'antd';
import styles from './style.module.scss'

const App: React.FC = () => {

    const [passwordVisible, setPasswordVisible] = React.useState(false);

    return (
        // <Space className={"w-full"} direction="horizontal">
        <Input.Password className={`w-100 ${styles.InputPassword}`} placeholder="input password"/>
        // </Space>
    );
};

export default App;