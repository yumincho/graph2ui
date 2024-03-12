import useWidgetStore from "@/store/widgetStore";
import { useState } from "react";

import { Controls, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

import styled from "@emotion/styled";

import Flow from "@/components/widget/Flow";
import Editor from "../widget/Editor";
import Modal from "../widget/EdgeModal";

const GraphSection = styled.div`
  flex: 1 0 0;

  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  z-index: 1;
`;

const Graph = () => {
  const { nodes, selectedNodeId, setNodeLabel } = useWidgetStore();

  const [toggleEdgeModal, setToggleEdgeModal] = useState(false);

  const nodeLabel: string = nodes.find((node) => node.id === selectedNodeId)
    ?.data.label;

  const onNodeLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const label = event.target.value;
    setNodeLabel(selectedNodeId, label);
  };

  return (
    <GraphSection>
      <h2>Graph</h2>
      {toggleEdgeModal && <Modal setToggleEdgeModal={setToggleEdgeModal} />}
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
        <Flow setToggleEdgeModal={setToggleEdgeModal} />
        <Controls />
      </ReactFlowProvider>
    </GraphSection>
  );
};

export default Graph;
