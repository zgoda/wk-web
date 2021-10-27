import text from './presentation.json';

/**
 * @typedef {Object} EventsTableProps
 * @property {Array.<import("../..").EventData>} items
 */

/**
 * @param {EventsTableProps} props
 * @returns {JSX.Element}
 */
function EventsTable({ items }) {
  if (items.length === 0) {
    return <p>{text.noEvents}</p>;
  }
  return (
    <table role="grid">
      <thead>
        <tr>
          <th scope="col">{text.events.table.header.columns.name}</th>
          <th scope="col">{text.events.table.header.columns.date}</th>
          <th scope="col">{text.events.table.header.columns.length}</th>
          <th scope="col">{text.events.table.header.columns.location}</th>
        </tr>
      </thead>
      <tbody>
        {items.map((ev) => (
          <tr key={`ev-${ev.created.getTime()}-${ev.date.getTime()}`}>
            <td>{ev.name}</td>
            <td>{ev.date.toLocaleDateString()}</td>
            <td>{ev.length}</td>
            <td>{ev.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { EventsTable };
