import { create } from "zustand";

export interface Node {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
}
interface Edge {
  id: string;
  source: string;
  target: string;
}

interface WidgetProps {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setSelectedNodeId: (nodeId: string) => void;
  setNodeLabel: (nodeId: string, newName: string) => void;
}

const useWidgetStore = create<WidgetProps>((set) => ({
  nodes: [
    {
      id: "0",
      position: { x: 0, y: 0 },
      data: { label: "New Node" },
    },
  ],
  selectedNodeId: "0",
  edges: [
    // { id: "e1-2", source: "1", target: "2", type: "smoothstep" }
  ],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  setNodeLabel: (nodeId, newName) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { label: newName } } : node
      ),
    })),
}));

export default useWidgetStore;
