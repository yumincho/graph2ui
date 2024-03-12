import useWidgetStore from "@/store/widgetStore";
import styled from "@emotion/styled";
import { IoClose } from "react-icons/io5";
import Divider from "./Divider";
import Editor from "./Editor";

const Dialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;

  border-radius: 12px;
  border: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);

  width: 400px;
  height: fit-content;

  padding: 0px;
  background-color: white;

  z-index: 2;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
`;

const iconStyle = {
  color: "#aaa",
  borderRadius: "4px",
  padding: "4px",
  backgroundColor: "#f5f5f5",
  cursor: "pointer",
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const NodeModal = ({ onClose }: { onClose: () => void }) => {
  const { nodes, selectedNodeId, setNodeLabel } = useWidgetStore();

  const nodeLabel: string | undefined = nodes
    .find((edge) => edge.id === selectedNodeId)
    ?.data.label.toString();

  const onNodeLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const label = event.target.value;
    setNodeLabel(selectedNodeId, label);
  };

  return (
    <Dialog>
      <Header>
        <h4>Node</h4>
        <IoClose size={24} style={iconStyle} onClick={onClose} />
      </Header>
      <Divider />

      <Content>
        <Editor
          editorName="Name"
          label={nodeLabel ? nodeLabel : ""}
          onLabelChange={onNodeLabelChange}
        />
      </Content>
    </Dialog>
  );
};

export default NodeModal;
