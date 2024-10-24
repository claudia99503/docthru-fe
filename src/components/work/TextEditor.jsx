import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import Loader from '../common/Loader';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar from './EditorToolbar';
import styles from './TextEditor.module.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function TextEditor() {
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {},
    },
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  useEffect(() => {
    if (quillRef.current && quillRef.current.getEditor) {
      const quillInstance = quillRef.current.getEditor();
      console.log('Quill instance:', quillInstance);
    }
  }, []);

  return (
    <div className={styles.TextEditor}>
      <EditorToolbar />
      <div className={styles.customEditor}>
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleContentChange}
          modules={modules}
          theme="default"
          formats={[
            'bold',
            'italic',
            'underline',
            'list',
            'bullet',
            'align',
            'color',
            'background',
          ]}
        />
      </div>
    </div>
  );
}
