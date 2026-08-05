const fs = require('fs');

function processUploadedFile(file) {
  if (!file) return null;
  const { originalname, path: filePath } = file;
  const ext = originalname.split('.').pop();
  const filename = `${filePath}.${ext}`;
  fs.renameSync(filePath, filename);
  return filename.replace(/\\/g, '/');
}

module.exports = {
  processUploadedFile
};
