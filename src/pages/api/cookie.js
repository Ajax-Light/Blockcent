import { setCookie } from 'cookies-next';

export default function handler(req, res) {
  setCookie('userid', req.query.userid, { req, res, maxAge: 60 * 60 * 24 });
  return res.status(200).json({ message: 'ok' });
}