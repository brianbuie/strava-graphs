(async function() {
  const host = 'http://localhost:3333';

  const res = await fetch(`${host}`);
  const body = await res.json();
  console.log(body);
})();
