import { keycloak } from "@/plugins/keycloak";

const checkTokenAndRedirectToLoginIfTokenExpired = async () => {
  if (keycloak.isTokenExpired()) {

    const redirectUri = window.location.href.replace(window.location.hash, "");
    console.log(`redirectUri: ${redirectUri}`);

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

  return await response.json();
};

export const get = async (url, access_token) => {
  await checkTokenAndRedirectToLoginIfTokenExpired();

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  });
  // console.log('response:');
  // console.log(`status: ${response.status}, body: ${await response.text()}`);
  // console.log(response);
  return await response.json();
};
