import style from './errorstate.module.css';

/**
 * @typedef {object} ErrorStateProps
 * @property {string} [message=null]
 *
 * @param {ErrorStateProps} props
 * @returns {JSX.Element}
 */
export function ErrorState({ message = null }) {
  const errorMessage = message || 'Coś poszło nie tak';

  return (
    <section>
      <hgroup style={style.errorbox}>
        <h1>Błąd</h1>
        <h2>{errorMessage}</h2>
      </hgroup>
    </section>
  );
}
