module.exports = (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found!'
  })
}
