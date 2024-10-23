import styles from './EditorToolbar.module.css';
import Svg from '../common/Svg';

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
      <Svg name={name} className={styles[`${name}`]} />
    </button>
  );
};

export default function EditorToolbar() {
  return (
    <div id="toolbar" className={styles.toolbar}>
      {buttonConfig.map(({ name, quillClass, value }) => (
        <IconButton
          key={name}
          name={name}
          quillClass={quillClass}
          value={value}
        />
      ))}

      <select className="ql-color">
        <option value="red"></option>
        <option value="green"></option>
        <option value="blue"></option>
        <option value="orange"></option>
        <option value="violet"></option>
        <option value="black"></option>
        <option defaultValue></option>
      </select>
      <button type="button" className={styles.colorButton}>
        <Svg name="paint" className={styles.paint} />
      </button>
    </div>
  );
}
