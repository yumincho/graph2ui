import useWidgetStore from "@/store/widgetStore";
import styled from "@emotion/styled";

const UISection = styled.div`
  padding: 1rem;
  flex: 1 0 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Interface = () => {
  const { nodes } = useWidgetStore();
  return (
    <UISection>
      <h2>Interface</h2>
      {nodes.map((node) => (
        <div key={node.id}>{node.data.label}</div>
      ))}
    </UISection>
  );
};

export default Interface;
