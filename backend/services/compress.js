const JSZip = require("jszip");

const zip = new JSZip();


async function filesArray2Zip(filesArray) {
    if(filesArray?.length){
        await filesArray.map((item) => {
            zip.file(item.name, item.data);
        });
    }else {
        zip.file(filesArray.name, filesArray.data);
    }
}

async function compressFiles(files) {
    let compress = await filesArray2Zip(files).then(() => {
        return zip.generateAsync({type: "arraybuffer"}).then((buffer) => {
            return buffer
        });

    });
    return compress
}

module.exports = compressFiles