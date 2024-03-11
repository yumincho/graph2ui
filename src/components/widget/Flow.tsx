import useWidgetStore from "@/store/widgetStore";
import { v4 as uuidv4 } from "uuid";

import { applyNodeChanges, applyEdgeChanges, addEdge, Edge } from "reactflow";
import "reactflow/dist/style.css";

import { useCallback, useRef } from "react";
import ReactFlow, {
  Connection,
  OnEdgesChange,
  OnNodesChange,
  NodeChange,
  OnConnect,
  useReactFlow,
  OnConnectStart,
  OnConnectEnd,
  MarkerType,
} from "reactflow";

interface onConnectStartProps {
  nodeId: string | null;
}

interface ToggleModalProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Flow = ({ setToggleModal }: ToggleModalProps) => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    setSelectedNodeId,
    setSelectedEdgeId,
  } = useWidgetStore();

  const { getNode } = useReactFlow();

  const makeClosedArrowEdge = (
    props: Connection | { id: string; source: string; target: string }
  ) => {
    return {
      ...props,
      label: "",
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: {
        strokeWidth: 2,
      },
    } as Edge;
  };

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes(applyNodeChanges(changes, nodes)),
    [setNodes, nodes]
  );

  function handleNodesChange(changes: NodeChange[]) {
    const nextChanges = changes.reduce((acc, change) => {
      if (change.type === "remove") {
        const node = getNode(change.id);
        if (node?.id !== "root") {
          return [...acc, change];
        }
        return acc;
      }
      return [...acc, change];
    }, [] as NodeChange[]);
    onNodesChange(nextChanges);
  }

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges(applyEdgeChanges(changes, edges)),
    [setEdges, edges]
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges(addEdge(makeClosedArrowEdge(connection), edges));
    },
    [setEdges, edges]
  );

  const connectingNodeId = useRef("");
  const { screenToFlowPosition } = useReactFlow();

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
          edges.concat(
            makeClosedArrowEdge({
              id: id,
              source: connectingNodeId.current,
              target: id,
            })
          )
        );
      }
    },
    [screenToFlowPosition, setNodes, nodes, setEdges, edges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={handleNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      onNodeClick={(_, node) => {
        setSelectedNodeId(node.id);
        setToggleModal(false);
      }}
      onEdgeClick={(_, edge) => {
        setSelectedEdgeId(edge.id);
        setToggleModal(true);
      }}
      nodeOrigin={[0.5, 0.0]}
      fitView
    />
  );
};

export default Flow;
