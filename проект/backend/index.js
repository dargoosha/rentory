const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("."));

app.get('/', (req, res) => {
    res.status(200).json("Сервер працює!");
});

const userRouter = require('./router/user.router.js');
app.use('/api/user', userRouter);

const bookingRouter = require('./router/booking.router.js');
app.use('/api/booking', bookingRouter);

const cityRouter = require('./router/city.router.js');
app.use('/api/city', cityRouter);

const sizeRouter = require('./router/size.router.js');
app.use('/api/size', sizeRouter);

const temperatureRouter = require('./router/temperature.router.js');
app.use('/api/temperature', temperatureRouter);

const warehouseRouter = require('./router/warehouse.router.js');
app.use('/api/warehouse', warehouseRouter);

const warehousetypeRouter = require('./router/warehousetype.router.js');
app.use('/api/warehousetype', warehousetypeRouter);

app.set('view engine', 'hbs');

app.listen(PORT, () => console.log(`Server START!!!`));


