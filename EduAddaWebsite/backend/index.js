const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbconnect = require("./Connection/conn.js")
const bodyParser = require('body-parser');

dbconnect();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const registerAndLogin = require('./Routes/RegisterAndLogin.js');
// const courseRoutes = require('./Routes');
const mockTestRoutes = require('./Routes/mockTestRoute.js');
// const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./Routes/dashBoardRoute.js');
const mockTestPerformanceRoutes = require('./Routes/mockTestPerformances.js');

app.use('/api/auth', registerAndLogin); // Namespaced the auth routes for clarity
// app.use('/api/courses', courseRoutes);
app.use('/api/mocktests', mockTestRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/mocktest-performance', mockTestPerformanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
