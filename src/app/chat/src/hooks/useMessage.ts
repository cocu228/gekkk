import { ChangeEvent, KeyboardEvent, useState } from "react";
import { getCookieData } from "../utils/shared";
import { apiPostFile } from "../api/post-file";
import { apiPostMessage } from "../api/post-message";

const useMessage = () => {
  const [text, setText] = useState<string>("");

  const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setText(target.value);
  };

  const handleOnAttach = async () => {
    const cookies = getCookieData();
    const sessionId = cookies["chat-session-id"];

    try {
      const fileInput: HTMLInputElement = document.createElement("input");
      fileInput.type = "file";

      fileInput.addEventListener("change", async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file: File | null = target.files ? target.files[0] : null;

        if (file) {
          const response = await apiPostFile(file, +sessionId);
          console.log("Download result:", response);
        }
      });

      fileInput.click();
    } catch (error) {
      console.error("Error occured when loading file:", error);
    }
  };

  const handleOnSendMessage = async (message: string) => {
    const cookies = getCookieData();

    const sessionId = cookies["chat-session-id"];

    const response = await apiPostMessage(+sessionId, "raw", message);

    if (response.status !== "success") {
      console.log("Error status PostMessage");
    }
  };

  const handleOnSubmit = () => {
    if (text.trim().length > 0) {
      handleOnSendMessage(text.trim());
      setText("");
    }
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents adding a new line
      handleOnSubmit();
      return;
    }
  };

  return {
    text,
    onChange: handleOnChange,
    onSubmit: handleOnSubmit,
    onEnter: handleOnKeyDown,
    onAttach: handleOnAttach
  };
};

export default useMessage;
