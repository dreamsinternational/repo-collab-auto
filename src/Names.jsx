export default function Names({ names = [], setNames = () => {} }) {
  return (
    <fieldset className="names">
      {names.map((name, index) => (
        <div
          key={index}
          className="name-div">
          <input
            type="text"
            className="name-inp"
            required
            value={name}
            onChange={(e) => setNames((n) => n.toSpliced(index, 1, e.target.value))}
          />
          <button
            type="button"
            onClick={() => setNames((n) => n.toSpliced(index, 1))}>
            Del
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => setNames((n) => n.concat(""))}>
        Add More
      </button>
    </fieldset>
  );
}
