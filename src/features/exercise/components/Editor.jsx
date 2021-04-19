import React from 'react';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';

import { imgurApi } from 'src/features/imageApi';

const Editor = ({ content, setContent }) => {
  return (
    <TinyEditor
      apiKey={process.env.REACT_APP_TINY_API_KEY}
      initialValue={content}
      init={{
        height: 500,
        plugins: `link nonbreaking codesample lists image imagetools media table wordcount preview`,
        toolbar: `undo redo | formatselect | bold italic underline |
                alignleft aligncenter alignright alignjustify | 
                bullist numlist table | outdent indent | link image media codesample | preview`,
        mode: 'exact',
        images_upload_handler: (blobInfo, success, failure) => {
          imgurApi
            .uploadImage({ imageFile: blobInfo.blob() })
            .then((result) => {
              success(result.data?.url);
            })
            .catch((error) => failure(JSON.stringify(error)));
        },
      }}
      textareaName={`content`}
      onBlur={(newContent, editor) => {
        setContent(newContent.target.getContent());
      }}
    />
  );
};

export default Editor;
