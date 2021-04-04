const Main = () => {
  return (
    <div style={{ width: "100%", height: 700, backgroundColor: "lightgray" }}>
      {/* 인기있는 업체 */}
      <div
        style={{
          width: "100%",
          height: 240,
          backgroundColor: "lightsalmon",
          display: "flex",
        }}
      >
        인기있는 업체
      </div>
      <div
        style={{
          width: "100%",
          height: 240,
          backgroundColor: "lightgreen",
          display: "flex",
        }}
      >
        최근 등록한 업체
      </div>
    </div>
  );
};

export default Main;
