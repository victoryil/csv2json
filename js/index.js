import { Parser } from "./csv-parser.js";
import { Reader } from "./read-file.js";
import { dropzoneFile, metaType, pd } from "./utils.js";
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
            let filename ="";
            let filen = file.name.split('.');
            filen.forEach((item, index) => {
                if(index === filen.length - 1) return;
                filename += item;
            }
            );
            filename = filename += ".json"
            if(metaType.value === "3") {
                Parser.csv2jsonDownload1By1(text);
            } else {
                fileDownloader.download(Parser.csv2json(text), filename, "text/plain")
            }
        })
    }
}