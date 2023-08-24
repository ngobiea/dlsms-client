const { session } = require('electron');

const ses = session.defaultSession;
const getCookies = async () => {
  try {
    return await ses.cookies.get({});
  } catch (error) {
    console.log(error);
    return [];
  }
};
const isSetCookie = async (data) => {
  try {
    const cookies = await ses.cookies.get({ name: data });
    return cookies.length !== 0;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const getCookie = async (data) => {
  try {
    return await ses.cookies.get({ name: data });
  } catch (error) {
    console.log(error);
    return [];
  }
};

const setCookies = (data) => {
  ses.cookies
    .set(data)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
const removeCookies = (url, name) => {
  ses.cookies
    .remove(url, name)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  getCookies,
  setCookies,
  removeCookies,
  isSetCookie,
  getCookie,
};
