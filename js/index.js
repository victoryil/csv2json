import { Parser } from "./csv-parser.js";



document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();

    for (const f of event.dataTransfer.files) {
        readSingleFile(f)
    }

});

document.getElementById('dropzone-file').addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();

    for (const f of event.target.files) {
        readSingleFile(f)
    }
});

function readSingleFile(f) {
    console.log(f)
    let resultado
    if (f) {
        var r = new FileReader();
        r.readAsText(f);
        r.onload = function () {
            resultado = r.result
            const data = Parser.csv2json(resultado)
            let filename = f.name
            filename = filename.replace(".csv", ".json")

            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data);
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
        
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", filename);
            dlAnchorElem.click();
        }

    } else {
        alert("Failed to load file");
    }
    return resultado
}
