// Moving liquid light inside an ember surface (CSS transforms only)
export function Liquid({ sheen = true }: { sheen?: boolean }) {
  return (
    <span aria-hidden="true" className="liquid">
      <span className="liquid-blob b1" />
      <span className="liquid-blob b2" />
      <span className="liquid-blob b3" />
      {sheen && <span className="liquid-sheen" />}
    </span>
  );
}
