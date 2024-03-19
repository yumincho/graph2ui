import { create } from "zustand";

interface Prompt {
  id: string;
  prompt: string;
}

interface PromptStoreProps {
  prompts: Prompt[];
  setPrompt: (edgeId: string, newPrompt: string) => void;
}

const usePromptStore = create<PromptStoreProps>((set) => ({
  prompts: [],
  setPrompt: (edgeId, newPrompt) =>
    set((state) =>
      state.prompts.findIndex((p) => p.id == edgeId) !== -1
        ? {
            prompts: state.prompts.map((prompt) =>
              prompt.id === edgeId ? { ...prompt, prompt: newPrompt } : prompt
            ),
          }
        : {
            prompts: [...state.prompts, { id: edgeId, prompt: newPrompt }],
          }
    ),
}));

export default usePromptStore;
