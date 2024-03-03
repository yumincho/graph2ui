import "./App.css";
import Graph from "@/components/section/GraphSection";
import Interface from "@/components/section/UISection";
function App() {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Graph />
      <Interface />
    </div>
  );
}

export default App;
