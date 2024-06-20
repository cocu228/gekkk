import { useState } from "react";

import { makeApiRequest } from "../../config/(cs)axios";

const useFileThumbnail = () => {
  const [downloading, setDownloading] = useState(false);

  return async (fileId: number) => {
    if (downloading) return;

    setDownloading(true);

    const thumbnailResponse = await makeApiRequest<Blob>(
      "GET",
      `/api/v1/files/${fileId}/pic/small`,
      undefined,
      { responseType: "blob" },
      "Error downloading file preview"
    );

    if (thumbnailResponse.status === "success") {
      setDownloading(false);
      return thumbnailResponse.data;
    }
  };
};

export default useFileThumbnail;
