import Environment from "../environment";

async function service(url = '', method = 'GET', data = {test:'1'}) {
  let opts = {
    method: method,
    mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('bearerToken')}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  }
  if(method === 'GET') delete opts.body;
  const response = await fetch(url, opts);
  return response.json();
}

export default service;
