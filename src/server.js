import express from 'express';
import prodRouter from './routes/products-router.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', prodRouter)

app.listen(8080, () => console.log("server ok puerto 8080"));