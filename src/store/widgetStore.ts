import { create } from "zustand";
import type { Node, Edge } from "reactflow";

interface WidgetProps {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string;
  selectedEdgeId: string;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setSelectedNodeId: (nodeId: string) => void;
  setSelectedEdgeId: (edgeId: string) => void;
  setNodeLabel: (nodeId: string, newName: string) => void;
  setEdgeLabel: (edgeId: string, newName: string) => void;
}

const useWidgetStore = create<WidgetProps>((set) => ({
  nodes: [
    {
      id: "root",
      position: { x: 0, y: 0 },
      data: { label: "Root Node" },
    },
  ],
  selectedNodeId: "",
  selectedEdgeId: "",
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  setSelectedEdgeId: (selectedEdgeId) => set({ selectedEdgeId }),
  setNodeLabel: (nodeId, newName) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { label: newName } } : node
      ),
    })),
  setEdgeLabel: (edgeId, newName) =>
    set((state) => ({
      edges: state.edges.map((edge) =>
        edge.id === edgeId ? { ...edge, label: newName } : edge
      ),
    })),
}));

export default useWidgetStore;
