const server = require("./app");
async function init() {
  await server.listen(process.env.PORT);
  console.log(`Running server on http://localhost:${process.env.PORT}`);
}
init();
