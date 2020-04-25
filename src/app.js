import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import purchaseRouter from './routes/purchase';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors({ origin: '*', credentials: true }));
app.get('/healthcheck', (req, res) => res.sendStatus(200));
app.use('/api', purchaseRouter);


app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);
  return res.status(res.statusCode || 500).send({ message: err.message });
});

const main = async () => {
    try {
      app.listen(8081);
      console.log("Application started on port 8081");
    } catch (err) {
      process.exit(1);
    }
  };
  
  main().catch(console.error);