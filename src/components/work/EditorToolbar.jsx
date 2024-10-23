import styles from './EditorToolbar.module.css';
import Svg from '../common/Svg';
import cn from '@/utils/clsx';

const buttonConfig = [
  { name: 'bold', quillClass: 'bold' },
  { name: 'italic', quillClass: 'italic' },
  { name: 'underline', quillClass: 'underline' },
  { name: 'alignLeft', quillClass: 'align', value: 'left' },
  { name: 'alignCenter', quillClass: 'align', value: 'center' },
  { name: 'alignRight', quillClass: 'align', value: 'right' },
  { name: 'bulletList', quillClass: 'list', value: 'bullet' },
  { name: 'numberList', quillClass: 'list', value: 'ordered' },
];

const IconButton = ({ name, quillClass, value }) => {
  return (
    <button
      className={`ql-${quillClass}`}
      type="button"
      {...(value && { value })}
    >
      <Svg name={name} className={styles[name]} />
    </button>
  );
};

export default function EditorToolbar() {
  return (
    <div id="toolbar" className={styles.EditorToolbar}>
      {buttonConfig.map(({ name, quillClass, value }) => (
        <IconButton
          key={name}
          name={name}
          quillClass={quillClass}
          value={value}
        />
      ))}

      <div className={styles['color-palette']}>
        {/* 커스텀 SVG 색상 선택 버튼 */}
        <button
          type="button"
          className={cn('ql-color', styles['color-button'])}
        >
          <Svg name="coloring" className={styles.coloring} />
        </button>

        {/* 색상 선택 항목 */}
        <span className="ql-color ql-picker ql-color-picker">
          <span className="ql-picker-options">
            <span
              className="ql-picker-item"
              data-value="#e60000"
              style={{ backgroundColor: '#e60000' }}
            ></span>
            <span
              className="ql-picker-item"
              data-value="#ff9900"
              style={{ backgroundColor: '#ff9900' }}
            ></span>
            <span
              className="ql-picker-item"
              data-value="#ffff00"
              style={{ backgroundColor: '#ffff00' }}
            ></span>
            <span
              className="ql-picker-item"
              data-value="#008a00"
              style={{ backgroundColor: '#008a00' }}
            ></span>
            <span
              className="ql-picker-item"
              data-value="#0066cc"
              style={{ backgroundColor: '#0066cc' }}
            ></span>
            <span
              className="ql-picker-item"
              data-value="#9933ff"
              style={{ backgroundColor: '#9933ff' }}
            ></span>
            <span
              className="ql-picker-item"
              data-value="#ffffff"
              style={{ backgroundColor: '#ffffff' }}
            ></span>
          </span>
        </span>
      </div>
    </div>
  );
}
