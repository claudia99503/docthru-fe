import dynamic from 'next/dynamic';
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import 'react-quill/dist/quill.snow.css';
import styles from './TextEditor.module.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});
const TextEditor = forwardRef((props, ref) => {
  const quillRef = useRef(null);

  const [content, setContent] = useState('');

  const STORAGE_KEY = 'workContent';

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

  useImperativeHandle(ref, () => ({
    saveContent: () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      alert('임시 저장되었습니다.');
      console.log('Saved content:', content);
    },
  }));

  useEffect(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    if (savedContent) {
      setContent(JSON.parse(savedContent));
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
});

export default TextEditor;
