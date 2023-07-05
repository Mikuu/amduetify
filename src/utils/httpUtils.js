export const post = async (url, payload) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return await response.json();
};

export const get = async url => {
  const response = await fetch(url, {
    method: 'GET',
  });

  return await response.json();
};
