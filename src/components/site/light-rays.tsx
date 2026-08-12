export function LightRays() {
  return (
    <div className="light-rays" aria-hidden="true">
      <div className="light-rays-source">
        <span className="light-ray light-ray-one" />
        <span className="light-ray light-ray-two" />
        <span className="light-ray light-ray-three" />
        <span className="light-ray light-ray-four" />
      </div>
      <div className="light-rays-glow" />
    </div>
  );
}
