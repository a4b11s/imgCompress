const JSZip = require('jszip');

const zip = new JSZip();

async function filesArray2Zip(filesArray) {
  if (filesArray?.length) {
    await filesArray.map((item) => {
      zip.file(item.name, item.data);
    });
  } else {
    zip.file(filesArray.name, filesArray.data);
  }
}

async function compressFiles(files) {
  return await filesArray2Zip(files).then(() => {
    return zip.generateAsync({ type: 'nodebuffer' }).then((buffer) => {
      return buffer;
    });
  });
}

module.exports = compressFiles;
