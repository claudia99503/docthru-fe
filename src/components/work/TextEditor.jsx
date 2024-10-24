import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './TextEditor.module.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});

export default function TextEditor({ setEditorRef }) {
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

  // useEffect(() => {
  //   const savedContent = localStorage.getItem('workContent');
  //   if (savedContent && quillRef.current) {
  //     const quillEditor = quillRef.current.getEditor();
  //     quillEditor.setContents(JSON.parse(savedContent));
  //   }
  // }, []);

  const handleContentChange = (value) => {
    setContent(value);
  };

  // useEffect(() => {
  //   if (quillRef.current) {
  //     setEditorRef(quillRef.current);
  //   }
  // }, [quillRef, setEditorRef]);

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
