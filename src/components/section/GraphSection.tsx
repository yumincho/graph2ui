import useWidgetStore from "@/store/widgetStore";

import { Controls, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

import styled from "@emotion/styled";

import Flow from "@/components/widget/Flow";

const GraphSection = styled.div`
  padding: 1rem;
  flex: 1 0 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Graph = () => {
  const {
    nodes,
    edges,
    selectedNodeId,
    selectedEdgeId,
    setNodeLabel,
    setEdgeLabel,
  } = useWidgetStore();
  const nodeLabel = nodes.find((node) => node.id === selectedNodeId)?.data
    .label;
  const edgeLabel = edges
    .find((edge) => edge.id === selectedEdgeId)
    ?.label?.toString();

  const onNodeLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const label = event.target.value;
    setNodeLabel(selectedNodeId, label);
  };

  const onEdgeLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const label = event.target.value;
    setEdgeLabel(selectedEdgeId, label);
  };

  return (
    <GraphSection>
      <h2>Graph</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
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
          <label>Change Node Name</label>
          <input
            value={nodeLabel ? nodeLabel : ""}
            onChange={onNodeLabelChange}
          />
        </div>
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
          <label>Change Edge Prompt</label>
          <input
            value={edgeLabel ? edgeLabel : ""}
            onChange={onEdgeLabelChange}
          />
        </div>
      </div>

      <ReactFlowProvider>
        <Flow />
        <Controls />
      </ReactFlowProvider>
    </GraphSection>
  );
};

export default Graph;
