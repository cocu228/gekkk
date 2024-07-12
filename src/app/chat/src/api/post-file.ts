import { apiPostMessage } from "./post-message";
import { makeApiRequest } from "../utils/(cs)axios";

export interface IResFileSuccess {
  id: number;
  name: string;
  path: string;
  size: number;
  createdAt: number;
  picture: boolean;
  downloadLink: string;
  thumbLink: string;
}

export const apiPostFile = async (file: File, sessionId: number) => {
  const formData = new FormData();
  formData.append("file", file);

  const uploadResponse = await makeApiRequest<IResFileSuccess>("POST", "/api/v1/files", formData);

  if (uploadResponse.status === "success") {
    return apiPostMessage(sessionId, "file", undefined, [uploadResponse.data.id]);
  } else {
    return { status: "error", errorMessage: "Request failed." };
  }
};
