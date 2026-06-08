function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

function error(message, err = null) {
  console.error(`[${new Date().toISOString()}] ERROR: ${message}`);

  if (err) {
    console.error(err);
  }
}

module.exports = {
  log,
  error,
};
