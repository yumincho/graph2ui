import { useState } from "react";

import { Controls, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

import styled from "@emotion/styled";

import Flow from "@/components/widget/Flow";
import NodeModal from "../widget/NodeModal";
import EdgeModal from "../widget/EdgeModal";

const GraphSection = styled.div`
  flex: 1 0 0;

  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  z-index: 1;
`;

const Graph = () => {
  const [toggleNodeModal, setToggleNodeModal] = useState(false);
  const [toggleEdgeModal, setToggleEdgeModal] = useState(false);

  return (
    <GraphSection>
      <h2>Graph</h2>
      {toggleNodeModal && <NodeModal setToggleNodeModal={setToggleNodeModal} />}
      {toggleEdgeModal && <EdgeModal setToggleEdgeModal={setToggleEdgeModal} />}

      <ReactFlowProvider>
        <Flow
          setToggleNodeModal={setToggleNodeModal}
          setToggleEdgeModal={setToggleEdgeModal}
        />
        <Controls />
      </ReactFlowProvider>
    </GraphSection>
  );
};

export default Graph;
