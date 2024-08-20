import constants from './Constants';
import axios from 'axios';
import getToken from '../../api/getTokenFromLocal';
import Constants from './Constants';
export async function getApi(url) {
  console.log('GetApi: ', `${constants.BASE_URL}/${url}`);
  const token = await getToken();
  // console.log('====================================');
  // console.log('token', token);
  // console.log('====================================');
  return await axios
    .get(`${constants.BASE_URL}/${url}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(error => {
      // ShowAlert('something went wrong');
      console.log('error: =========>', error + url);
    });
}

export async function getApiWithParam(url, param) {
  const token = await getToken();
  console.log(
    'getApiWithParam: ',
    `${token}=====${constants.BASE_URL}/${url}?${param}`,
  );
  return await axios
    .get(`${constants.BASE_URL}/${url}?${Number(param)}`, {
      params: {
        page: param,
        pageSize: 20,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(error => {
      // ShowAlert('something went wrong');
      console.log('error: =========>', error);
    });
}

export async function postApi(url, payload, {header}) {
  const token = await getToken();
  console.log(
    'PostApi: ',
    `${constants.BASE_URL}/${url}`,
    header.Accept,
    payload,
  );

  return await axios
    .post(`${constants.BASE_URL}/${url}`, payload, {
      headers: {
        Accept: header.Accept,
        Authorization: `Bearer ${token}`,
        'Content-type': header.contenttype,
      },
    })
    .catch(error => {
      // ShowAlert('something went wrong');
      console.log('error: =========>', error);
    });
}
export async function deleteApi(url, payload, {header}) {
  const token = await getToken();
  console.log(
    'deleteApi: ',
    `${constants.BASE_URL}/${url}`,
    header.Accept,
    payload,
    token,
  );

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);

  var raw = JSON.stringify(payload);

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return await fetch(`${Constants.BASE_URL}/${url}`, requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
