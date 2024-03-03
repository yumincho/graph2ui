import useWidgetStore from "@/store/widgetStore";

import { useCallback } from "react";
import ReactFlow, { OnEdgesChange, OnNodesChange, OnConnect } from "reactflow";
import {
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import styled from "@emotion/styled";

const GraphSection = styled.div`
  padding: 1rem;
  flex: 1 0 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Flow = () => {
  const { nodes, edges, setNodes, setEdges } = useWidgetStore();
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes(applyNodeChanges(changes, nodes)),
    [setNodes, nodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges(applyEdgeChanges(changes, edges)),
    [setEdges, edges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges(addEdge(connection, edges));
    },
    [setEdges, edges]
  );
  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    />
  );
};

const Graph = () => {
  return (
    <GraphSection>
      <h2>Graph</h2>
      <ReactFlowProvider>
        <Flow />
        <Controls />
      </ReactFlowProvider>
    </GraphSection>
  );
};

export default Graph;
