import LiveStream from "../components/LiveStream";
import DetectionPanel from "../components/DetectionPanel";
import InfoPanel from "../components/InfoPanel";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="main-grid">
      <div className="left-panel">
        <DetectionPanel detections={[]} />
        <LiveStream />
      </div>

      <InfoPanel />
    </div>
  );
};

export default Home;