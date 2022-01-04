const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./app/models');
const Role = db.role;

const corsOption = {
  origin: null,
};

/* middleWare */
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* route */
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to application' });
});

/* sequelize */
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync DB');
  const roleInital = require('./sync/role.initial')(Role);
});

/* set port, listen for requests */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
