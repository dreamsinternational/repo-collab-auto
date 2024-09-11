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
            onChange={(e) => setNames((allnames) => allnames.toSpliced(index, 1, e.target.value))}
          />
        </div>
      ))}
    </fieldset>
  );
}
