import { keycloak } from "@/plugins/keycloak";

const checkTokenAndRedirectToLoginIfTokenExpired = async () => {
  if (keycloak.isTokenExpired()) {

    const redirectUri = window.location.href.replace(window.location.hash, "");

    /**
     * Easy for use, but low secure.
     * **/
    // await keycloak.login();

    /**
     * More secure, but worse usability and need configure correct redirectUri in Keycloak.
     * **/
    await keycloak.logout({ redirectUri });
  }
};

export const post = async (url, access_token, payload) => {
  await checkTokenAndRedirectToLoginIfTokenExpired();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return await response.json();
  } else if (response.status >= 400 && response.status <= 600) {
    const responseJson = await response.json();
    throw new Error(responseJson?.message);
  }
};

export const get = async (url, access_token) => {
  await checkTokenAndRedirectToLoginIfTokenExpired();

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return await response.json();
};

export const del = async (url, access_token) => {
  await checkTokenAndRedirectToLoginIfTokenExpired();

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  return await response.json();

};
