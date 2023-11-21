import React, {useEffect, useState} from 'react';
import {MessageFile} from './../../../model/types';
import Loader from './../../loader/Loader';
import useFileThumbnail from './../../../model/hooks/useFileThumbnail';
import useFileDownloader from './../../../model/hooks/useFileDownloader';

interface IParams {
  file: MessageFile;
}

const ImagePreview: React.FC<IParams> = ({file}) => {
  const downloadFile = useFileDownloader();
  const downloadFileThumbnail = useFileThumbnail();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    let url = '';
	
    (async () => {
      const imageBlob = await downloadFileThumbnail(file.id);
      
      if (imageBlob) {
        url = URL.createObjectURL(imageBlob);
        setImageUrl(url);
      }
    })();
    
    return () => {
      URL.revokeObjectURL(url);
    };
  }, []);
  
  const handleFileDownload = async () => {
    if (!file.id) return
    downloadFile(file.id, file.name)
  }
  
  return (
      <div style={{ width: '100px', height: '100px', position: 'relative' }}>
        {imageUrl ? (
            <img src={imageUrl} alt="Image" style={{width: '100%'}} onClick={handleFileDownload} />
        ) : (
            <Loader style={{borderColor: 'white', borderBottomColor: 'transparent'}} />
        )}
      </div>
  );
};

export default ImagePreview;
