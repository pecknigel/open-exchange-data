import express from 'express';

const router = express.Router();

router.get('/tickers', function(req, res) {
  const responseData = [{tickerId: 'ALP'}, {tickerId: 'TJU'}];
  res.send(responseData);
});

router.get('/ticker/:tickerId', function(req, res) {
  const responseData = {tickerId: req.params.tickerId };
  res.send(responseData);
});

export default router;
