interface EditorProps {
  editorName: string;
  label: string;
  onLabelChange: (_: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const Editor = ({
  editorName,
  label,
  onLabelChange,
  rows = 1,
}: EditorProps) => {
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
      <textarea
        value={label}
        onChange={onLabelChange}
        style={{ width: "auto", padding: "8px", resize: "none" }}
        rows={rows}
      />
    </div>
  );
};

export default Editor;
