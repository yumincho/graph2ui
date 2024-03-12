import { useOverlay } from "@toss/use-overlay";

export const useModal = () => {
  const overlay = useOverlay();

  return {
    open: (Children: React.FC<{ onClose: () => void }>) =>
      overlay.open(({ exit }) => <Children onClose={exit} />),
    close: () => overlay.close(),
  };
};
