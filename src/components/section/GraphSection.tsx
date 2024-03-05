import useWidgetStore from "@/store/widgetStore";
import { v4 as uuidv4 } from "uuid";

import { useCallback, useRef } from "react";
import ReactFlow, {
  OnEdgesChange,
  OnNodesChange,
  OnConnect,
  useReactFlow,
  OnConnectStart,
  OnConnectEnd,
} from "reactflow";
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
      setEdges(addEdge({ ...connection, type: "smoothstep" }, edges));
    },
    [setEdges, edges]
  );

  const connectingNodeId = useRef("");
  const { screenToFlowPosition } = useReactFlow();

  interface onConnectStartProps {
    nodeId: string | null;
  }
  const onConnectStart: OnConnectStart = useCallback(
    (_, { nodeId }: onConnectStartProps) => {
      nodeId ? (connectingNodeId.current = nodeId) : null;
    },
    []
  );

  const onConnectEnd: OnConnectEnd = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!connectingNodeId.current) return;
      const targetIsPane = (event.target as Element)?.classList.contains(
        "react-flow__pane"
      );

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = uuidv4();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x:
              event instanceof MouseEvent
                ? event.clientX
                : event.changedTouches[0].clientX,
            y:
              event instanceof MouseEvent
                ? event.clientY
                : event.changedTouches[0].clientY,
          }),
          data: { label: `New Node` },
          origin: [0.5, 0.0],
        };

        setNodes(nodes.concat(newNode));
        setEdges(
          edges.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition, setNodes, nodes, setEdges, edges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      nodeOrigin={[0.5, 0.0]}
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
