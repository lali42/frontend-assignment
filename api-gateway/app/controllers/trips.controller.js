const dataServer = require("../data-server");

const JsonServer = "http://localhost:9000";
const api = dataServer(JsonServer);

exports.trips = (req, res) => {
  if (req.query.keyword) {
    api.get(req.path).then((resp) => {
      const filterAPI = resp.data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(req.query.keyword.toLowerCase());
      });
      console.log("KeyWord : " + req.query.keyword);
      res.status(200).send(filterAPI);
    });
  } else {
    api.get(req.path).then((resp) => {
      console.log("Celled : " + req.path);
      res.status(200).send(resp.data);
    });
  }
};
