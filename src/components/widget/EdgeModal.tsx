import useWidgetStore from "@/store/widgetStore";
import styled from "@emotion/styled";
import { IoClose } from "react-icons/io5";
import Divider from "./Divider";
import Editor from "./Editor";

const Dialog = styled.dialog`
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  width: 400px;
  height: 300px;

  padding: 0px;
  background-color: white;

  z-index: 2;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
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
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

interface ToggleModalProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ setToggleModal }: ToggleModalProps) => {
  const { nodes, edges, selectedEdgeId, setEdgeLabel } = useWidgetStore();
  const selectedEdge = edges.find((edge) => edge.id === selectedEdgeId);
  const sourceNode = nodes.find((node) => node.id === selectedEdge?.source);
  const targetNode = nodes.find((node) => node.id === selectedEdge?.target);

  const handleOnClick = () => {
    setToggleModal((curr) => !curr);
  };

  const edgeLabel: string | undefined = edges
    .find((edge) => edge.id === selectedEdgeId)
    ?.label?.toString();

  const onEdgeLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const label = event.target.value;
    setEdgeLabel(selectedEdgeId, label);
  };

  return (
    <Dialog open>
      <Header>
        <h4>Edge</h4>
        <IoClose size={24} style={iconStyle} onClick={handleOnClick} />
      </Header>
      <Divider />

      <Content>
        <Editor
          editorName="Name:"
          label={edgeLabel ? edgeLabel : ""}
          onLabelChange={onEdgeLabelChange}
        />
        <Row>
          <span>From:</span>
          <span>{sourceNode?.data.label}</span>
        </Row>
        <Row>
          <span>To:</span>
          <div>{targetNode?.data.label}</div>
        </Row>
      </Content>
    </Dialog>
  );
};

export default Modal;
