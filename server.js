const app = require("express")();
const { json } = require("body-parser");
const routes = require("./routes");
const PORT = 3000;

app.use(json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Yo, I'm listening in the year ${PORT}`);
});

module.exports = app;
