import { Parser } from "./csv-parser.js";
import { Reader } from "./read-file.js";
import { dropzoneFile, pd } from "./utils.js";
import { fileDownloader } from "./download-file.js";


document.addEventListener('drop', (event) => {
    pd.preventDefault(event);
    resolveFiles(event.dataTransfer.files)

});

document.addEventListener('dragover', (event) => {
    pd.preventDefault(event);

});

dropzoneFile.addEventListener('change', (event) => {
    pd.preventDefault(event);
    resolveFiles(event.dataTransfer.files)
    
});

function resolveFiles(files) {
    for (const file of files) {
        Reader.readFile(file).then(text => {
            fileDownloader.download(Parser.csv2json(text), file.name.replace(".csv",".json"), "text/plain")
        })
    }
}