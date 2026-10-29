export function notFound(req, res) {
  res
    .status(404)
    .json({ error: `Unknown route: ${req.method} ${req.originalUrl}` });
}
