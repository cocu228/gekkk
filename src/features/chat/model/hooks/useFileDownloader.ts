import { useState } from "react";

import { makeApiRequest } from "../../config/(cs)axios";

const useFileDownloader = () => {
  const [downloading, setDownloading] = useState(false);

  return async (fileId: number, fileName: string) => {
    if (downloading) return;

    setDownloading(true);

    const downloadResponse = await makeApiRequest<Blob>(
      "GET",
      `/api/v1/files/${fileId}/download`,
      undefined,
      { responseType: "blob" },
      "Error downloading file"
    );

    if (downloadResponse.status === "success") {
      setDownloading(false);
      const url = window.URL.createObjectURL(downloadResponse.data);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.style.display = "none";
      document.body.appendChild(a);

      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };
};

export default useFileDownloader;
