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
        justifyContent: "space-between",
        alignContent: "center",

        borderRadius: "12px",
        width: "auto",
        padding: "12px",

        backgroundColor: "#f4f4f4",
      }}
    >
      <label
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {editorName}
      </label>
      <input
        value={label}
        onChange={onLabelChange}
        style={{ width: "100%", marginLeft: "12px" }}
      />
    </div>
  );
};

export default Editor;
