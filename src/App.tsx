import "./App.css";
import Graph from "@/components/section/GraphSection";
import Interface from "@/components/section/UISection";
function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <Graph />
      <Interface />
    </div>
  );
}

export default App;
