// import dynamic from 'next/dynamic';
// import { useEffect, useRef, useState } from 'react';
// import Loader from '../common/Loader';
// import 'react-quill/dist/quill.snow.css';

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// export default function TextEditor() {
//   const [content, setContent] = useState('');
//   const quillRef = useRef(null);

//   const modules = {
//     toolbar: {
//       container: [
//         ['bold', 'italic', 'underline'],
//         [{ align: [] }],
//         [{ list: 'bullet' }, { list: 'ordered' }],
//         [{ color: [] }],
//       ],
//     },
//   };

//   const handleContentChange = (value) => {
//     setContent(value);
//   };

//   return (
//     <div>
//       <ReactQuill
//         ref={quillRef}
//         value={content}
//         onChange={handleContentChange}
//         modules={modules}
//         theme="snow"
//       />
//       <p>Editor content:{content}</p>
//     </div>
//   );
// }
