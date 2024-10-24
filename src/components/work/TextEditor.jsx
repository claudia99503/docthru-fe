import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './TextEditor.module.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function TextEditor() {
  const [content, setContent] = useState('');
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ size: [] }],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
      ['clean'],
    ],
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
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleContentChange}
        modules={modules}
        theme="snow"
        placeholder="번역 시작하기..."
      />
    </div>
  );
}
