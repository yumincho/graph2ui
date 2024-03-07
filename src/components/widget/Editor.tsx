interface EditorProps {
  editorName: string;
  label: string;
  onLabelChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
}

const Editor = ({ editorName, label, onLabelChange }: EditorProps) => {
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        padding: "16px",
        width: "200px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
      }}
    >
      <label>{editorName}</label>
      <input value={label} onChange={onLabelChange} />
    </div>
  );
};

export default Editor;
