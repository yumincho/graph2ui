import { create } from "zustand";

interface Node {
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
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
}

const useWidgetStore = create<WidgetProps>((set) => ({
  nodes: [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
    { id: "3", position: { x: 0, y: 200 }, data: { label: "3" } },
  ],
  edges: [{ id: "e1-2", source: "1", target: "2" }],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
}));

export default useWidgetStore;
