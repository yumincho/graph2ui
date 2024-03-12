import { Controls, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

import styled from "@emotion/styled";

import Flow from "@/components/widget/Flow";

const GraphSection = styled.div`
  flex: 1 0 0;

  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  z-index: 1;
`;

const Graph = () => {
  return (
    <GraphSection>
      <h2>Graph</h2>

      <ReactFlowProvider>
        <Flow />
        <Controls />
      </ReactFlowProvider>
    </GraphSection>
  );
};

export default Graph;
