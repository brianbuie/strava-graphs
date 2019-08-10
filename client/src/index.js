async function go() {
  const host = process.env.API_ENDPOINT;

  const res = await fetch(host);
  const body = await res.json();
  console.log(body);
}

go();
