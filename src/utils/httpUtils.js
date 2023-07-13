export const post = async (url, access_token, payload) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify(payload),
    });

    return await response.json();
};

export const get = async (url, access_token) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });

  return await response.json();
};
