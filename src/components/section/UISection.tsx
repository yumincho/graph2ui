import useWidgetStore from "@/store/widgetStore";
import styled from "@emotion/styled";

const UISection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  flex: 1 0 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Widget = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  text-align: left;
`;

const DefaultUI = styled.div`
  display: flex;
  align-items: end;
`;

const RootNode = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  align-items: flex-start;
  width: 100%;
`;

const ActionButton = styled.button`
  margin-left: 1rem;
  width: 100px;
  height: 50px;
  background-color: #007bff;
  color: #fff;

  &:disabled {
    background-color: #eee;
    color: #999;
  }
`;

const GeneratedUI = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Interface = () => {
  const { nodes } = useWidgetStore();
  return (
    <UISection>
      <h2>Interface</h2>
      <DefaultUI>
        <RootNode>
          <label htmlFor={nodes[0].id}>{nodes[0].data.label}</label>
          <textarea
            name={nodes[0].id}
            rows={10}
            style={{ width: "100%", resize: "none" }}
          />
        </RootNode>
        <ActionButton disabled={nodes.length <= 1}>Action</ActionButton>
      </DefaultUI>
      <GeneratedUI>
        {nodes.slice(1).map((node) => (
          <>
            <Widget key={node.id}>
              {node.data.label}
              <div
                style={{
                  height: "100px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                }}
              ></div>
            </Widget>
          </>
        ))}
      </GeneratedUI>
    </UISection>
  );
};

export default Interface;
