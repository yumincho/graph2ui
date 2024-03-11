import useWidgetStore from "@/store/widgetStore";
import { useState } from "react";

import { Controls, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

import styled from "@emotion/styled";

import Flow from "@/components/widget/Flow";
import Editor from "../widget/Editor";
import Modal from "../widget/EdgeModal";

const GraphSection = styled.div`
  padding: 1rem;
  flex: 1 0 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Graph = () => {
  const { nodes, selectedNodeId, setNodeLabel } = useWidgetStore();

  const [toggleModal, setToggleModal] = useState(false);

  const nodeLabel: string = nodes.find((node) => node.id === selectedNodeId)
    ?.data.label;

  const onNodeLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const label = event.target.value;
    setNodeLabel(selectedNodeId, label);
  };

  return (
    <GraphSection>
      <h2>Graph</h2>
      {toggleModal && <Modal setToggleModal={setToggleModal} />}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        <Editor
          editorName="Change Node Name"
          label={nodeLabel ? nodeLabel : ""}
          onLabelChange={onNodeLabelChange}
        />
      </div>

      <ReactFlowProvider>
        <Flow setToggleModal={setToggleModal} />
        <Controls />
      </ReactFlowProvider>
    </GraphSection>
  );
};

export default Graph;
