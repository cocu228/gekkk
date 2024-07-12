import PasswordInput, { PasswordInputProps } from "./passwordInput";
import CheckList from "./checklist";
import { useState } from "preact/hooks";

const PasswordWithChecklist = (props: PasswordInputProps) => {
  const { onChange, ...rest } = props;
  const [password, setPassword] = useState("");

  const handleChange = e => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
    if (onChange) onChange(e);
  };

  return (
    <div>
      <PasswordInput {...rest} onChange={handleChange} />
      <CheckList value={password} />
    </div>
  );
};

export default PasswordWithChecklist;
