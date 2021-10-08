/**
 * @param {{ email: string; name: string; }} user
 * @returns Promise<boolean>
 */
async function updateUser(user) {
  const url = `/api/user/${user.email}`;
  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: user.name }),
  });
  if (resp.ok) {
    return true;
  }
  return false;
}

export { updateUser };
