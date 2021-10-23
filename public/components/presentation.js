/**
 * @typedef {Object} EventsTableProps
 * @property {Array.<import("../..").Event>} items
 */

/**
 * @param {EventsTableProps} props
 * @returns {JSX.Element}
 */
function EventsTable({ items }) {
  if (items.length === 0) {
    return <p>Nie ma żadnych nadchodzących wydarzeń.</p>;
  }
  return (
    <table role="grid">
      <thead>
        <tr>
          <th scope="col">Nazwa</th>
          <th scope="col">Data</th>
          <th scope="col">Długość</th>
          <th scope="col">Lokalizacja</th>
        </tr>
      </thead>
      <tbody>
        {items.map((ev) => (
          <tr key={`ev-${ev.created}-${ev.date}`}>
            <td>{ev.name}</td>
            <td>{ev.date.toLocaleString()}</td>
            <td>{ev.length}</td>
            <td>{ev.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { EventsTable };
