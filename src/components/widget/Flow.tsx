import useWidgetStore from "@/store/widgetStore";
import { v4 as uuidv4 } from "uuid";

import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";

import { useCallback, useRef } from "react";
import ReactFlow, {
  OnEdgesChange,
  OnNodesChange,
  OnConnect,
  useReactFlow,
  OnConnectStart,
  OnConnectEnd,
  MarkerType,
} from "reactflow";

const Flow = () => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    setSelectedNodeId,
    setSelectedEdgeId,
  } = useWidgetStore();

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
      setEdges(addEdge({ ...connection }, edges));
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
          edges.concat({
            id,
            source: connectingNodeId.current,
            target: id,
            label: "",
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            style: {
              strokeWidth: 2,
            },
          })
        );
      }
    },
    [screenToFlowPosition, setNodes, nodes, setEdges, edges]
  );

  const onNodeClick = (node: Node) => {
    setSelectedNodeId(node.id);
  };

  const onEdgeClick = (edge: Edge) => {
    setSelectedEdgeId(edge.id);
  };

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      onNodeClick={(_, node) => onNodeClick(node)}
      onEdgeClick={(_, edge) => onEdgeClick(edge)}
      nodeOrigin={[0.5, 0.0]}
      fitView
    />
  );
};

export default Flow;
