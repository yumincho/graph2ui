import { create } from "zustand";

interface Arrow {
  from: number;
  to: number;
}

interface WidgetProps {
  widgets: string[];
  arrows: Arrow[];
  addWidget: (widget: string) => void;
}

const useWidgetStore = create<WidgetProps>((set) => ({
  widgets: [],
  arrows: [],
  addWidget: (widget) =>
    set((state) => ({ widgets: [...state.widgets, widget] })),
}));

export default useWidgetStore;
