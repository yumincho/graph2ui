import "./App.css";
import Graph from "@/components/section/GraphSection";
import Interface from "@/components/section/UISection";
import { OverlayProvider } from "@toss/use-overlay";

function App() {
  return (
    <OverlayProvider>
      <div
        style={{
          display: "flex",
          height: "100%",
        }}
      >
        <Graph />
        <Interface />
      </div>
    </OverlayProvider>
  );
}

export default App;
