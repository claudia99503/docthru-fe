import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import Loader from '../common/Loader';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar from './EditorToolBar';

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
    if (quillRef.current) {
      console.log('커스텀툴바');
    }
  }, [quillRef]);

  return (
    <div>
      <EditorToolbar />
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleContentChange}
        modules={modules}
      />
      <p>Editor content:{content}</p>
    </div>
  );
}
