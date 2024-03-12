interface EditorProps {
  editorName: string;
  label: string;
  onLabelChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
}

const Editor = ({ editorName, label, onLabelChange }: EditorProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",

        width: "auto",
      }}
    >
      <label
        style={{
          display: "flex",
          justifyContent: "left",
        }}
      >
        {editorName}
      </label>
      <input
        value={label}
        onChange={onLabelChange}
        style={{ width: "auto", padding: "8px" }}
      />
    </div>
  );
};

export default Editor;
