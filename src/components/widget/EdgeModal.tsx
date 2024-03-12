import useWidgetStore from "@/store/widgetStore";
import styled from "@emotion/styled";
import { IoClose } from "react-icons/io5";
import Divider from "./Divider";
import Editor from "./Editor";

const Dialog = styled.dialog`
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

const Infos = styled.div`
  display: flex;
  flex-direction: row;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: left;

  width: 100%;
`;

const InfoLabel = styled.label`
  text-align: left;
`;

const InfoValue = styled.span`
  font-weight: bold;
  text-align: left;
`;

const Prompt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: auto;
`;

interface ToggleModalProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EdgeInfo = ({
  fromNode,
  toNode,
}: {
  fromNode: string;
  toNode: string;
}) => {
  return (
    <Infos>
      <Info>
        <InfoLabel>From</InfoLabel>
        <InfoValue>{fromNode}</InfoValue>
      </Info>
      <Info>
        <InfoLabel>To</InfoLabel>
        <InfoValue>{toNode}</InfoValue>
      </Info>
    </Infos>
  );
};

const EdgeModal = ({ setToggleModal }: ToggleModalProps) => {
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
    <Dialog>
      <Header>
        <h4>Edge</h4>
        <IoClose size={24} style={iconStyle} onClick={handleOnClick} />
      </Header>
      <Divider />

      <Content>
        <EdgeInfo
          fromNode={sourceNode?.data.label}
          toNode={targetNode?.data.label}
        />
        <Editor
          editorName="Name"
          label={edgeLabel ? edgeLabel : ""}
          onLabelChange={onEdgeLabelChange}
        />
        <Prompt>
          <InfoLabel>Prompt</InfoLabel>
          <textarea rows={8} style={{ resize: "none", padding: "8px" }} />
        </Prompt>
      </Content>
    </Dialog>
  );
};

export default EdgeModal;
