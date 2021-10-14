import { useState } from 'preact/hooks';

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

/**
 * @typedef {Object} FlashMessagesProps
 * @property {ReadonlyArray<import('../..').FlashMessage>} messages
 *
 * @param {FlashMessagesProps} props
 */
function FlashMessages({ messages }) {
  if (messages.length === 0) {
    return null;
  }
}

export { Alert, FlashMessages };
