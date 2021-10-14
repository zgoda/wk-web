import { useEffect, useState } from 'preact/hooks';
import { useStoreon } from '../utils/state';

/**
 * @typedef {Object} AlertProps
 * @property {string} style
 * @property {string} text
 *
 * @param {AlertProps} props
 * @returns
 */
function Alert({ style, text }) {
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div class={`alert-${style}`}>
        <span class="closebtn" onClick={() => setVisible(false)}>
          &times;
        </span>
        {text}
      </div>
    );
  }
  return null;
}

function FlashMessages() {
  const { dispatch, flashMessages } = useStoreon('session');

  useEffect(() => {
    return () => dispatch('flash/clear');
  }, [dispatch]);

  return (
    <>
      {flashMessages.map(
        (
          /** @type {import('../..').FlashMessage} */ msg,
          /** @type {number} */ index,
        ) => (
          <Alert key={`flash-${index}`} style={msg.style} text={msg.text} />
        ),
      )}
    </>
  );
}

export { Alert, FlashMessages };
