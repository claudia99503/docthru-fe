'use client';
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
import Toast from '../modals/Toast';
import CAN_USE_DOM from '@/utils/canUseDom';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Editor...</p>,
});
const TextEditor = forwardRef(({ id, content, setContent }, ref) => {
  const quillRef = useRef(null);
  const [hasDraft, setHasDraft] = useState(false);
  const STORAGE_KEY = `work_${id}`;
  let savedContent;

  if (CAN_USE_DOM) {
    savedContent = localStorage.getItem(STORAGE_KEY);
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ size: [] }],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
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

  const handleBringBackDraft = () => {
    setContent(JSON.parse(savedContent));
    setHasDraft(false);
  };

  useEffect(() => {
    if (savedContent) {
      setHasDraft(true);
    }
  }, []);

  return (
    <>
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
      {hasDraft && (
        <Toast
          msg="임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요??"
          buttonDisplay="불러오기"
          onConfirm={handleBringBackDraft}
          onClose={() => setHasDraft(false)}
        />
      )}
    </>
  );
});

export default TextEditor;
