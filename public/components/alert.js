import { useState } from 'preact/hooks';

/**
 * @typedef {Object} Props
 * @property {string} style
 * @property {string} text
 *
 * @param {Props} props
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

export { Alert };
