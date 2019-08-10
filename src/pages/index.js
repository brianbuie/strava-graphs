import React from 'react';

export default () => {
  const host = process.env.API_ENDPOINT;

  fetch(host).then(res => res.json().then(console.log));

  return <h1>Hello Gatsby!</h1>;
};
