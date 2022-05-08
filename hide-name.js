const fs = require('fs');
var os = require("os");
const MD5 = require("crypto-js/md5");

const diffKey = "Version:";
var outputDir = "hashed";

function readFiles(path){
    var files = fs.readdirSync(path);
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }
    files.forEach((filename) => {
        parseFile(filename)
    });
}

function parseFile(filename){
    if (!filename.endsWith(".osu")){
        return;
    }
    const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
    const hash = MD5(data).toString();
    var newData = "";
    data.split(/\r?\n/).forEach(line =>  {
        if (line.startsWith(diffKey)){
            var newDiffName = diffKey+hash;
            console.log(newDiffName)
            newData+=newDiffName+os.EOL
        } else {
            newData+=line+os.EOL
        }
    });

    fs.writeFileSync(`${outputDir}/${hash}.osu`, newData);
}

readFiles(__dirname);