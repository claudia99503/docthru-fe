'use client';
import styles from './EditorToolbar.module.css';
import Svg from '../common/Svg';
import cn from '@/utils/clsx';

const buttonConfig = [
  { name: 'bold', quillClass: 'bold' },
  { name: 'italic', quillClass: 'italic' },
  { name: 'underline', quillClass: 'underline' },
  { name: 'alignLeft', quillClass: 'align', value: '' },
  { name: 'alignCenter', quillClass: 'align', value: 'center' },
  { name: 'alignRight', quillClass: 'align', value: 'right' },
  { name: 'bulletList', quillClass: 'list', value: 'bullet' },
  { name: 'numberList', quillClass: 'list', value: 'ordered' },
];

// Quill 인스턴스에 색상 적용
const applyColor = (quill, color) => {
  if (quill) {
    const range = quill.getSelection();
    if (range) {
      quill.format('color', color); // 선택한 텍스트에 색상 적용
    }
  }
};

const IconButton = ({ name, quillClass, value, quill }) => {
  return (
    <button
      className={`ql-${quillClass}`}
      type="button"
      {...(value && { value })}
      onClick={() => quill && applyColor(quill, '#ff9900')} // quill이 정의된 경우에만 색상 적용
    >
      <Svg name={name} className={styles[name]} />
    </button>
  );
};

export default function EditorToolbar({ quill }) {
  return (
    <div id="toolbar" className={styles.EditorToolbar}>
      {buttonConfig.map(({ name, quillClass, value }) => (
        <IconButton
          key={name}
          name={name}
          quillClass={quillClass}
          value={value}
          quill={quill} // quill 인스턴스 전달
        />
      ))}

      <div className={styles['color-palette']}>
        {/* 커스텀 SVG 색상 선택 버튼 */}
        <button
          type="button"
          className={cn('ql-color', styles['color-button'])}
          onClick={() => quill && applyColor(quill, '#ff9900')} // quill이 정의된 경우에만 실행
        >
          <Svg name="coloring" className={styles.coloring} />
        </button>
      </div>
    </div>
  );
}
