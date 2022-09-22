document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();

    for (const f of event.dataTransfer.files) {
        const csvFilePath = f.path
        readSingleFile(f)
    }

});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('dragenter', (event) => {
});

document.addEventListener('dragleave', (event) => {
});


document.getElementById('dropzone-file').addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();

    for (const f of event.target.files) {
        const csvFilePath = f.path
        readSingleFile(f)
    }
});


function csv2json(csv, f) {
    const array = csv.toString().split("\n");

    
    const csvToJsonResult = [];

    
    const headers = array[0].split(",")
    
    for (let i = 1; i < array.length - 1; i++) {
        
        const jsonObject = {}
        
        const currentArrayString = array[i]
        let string = ''

        let quoteFlag = 0
        for (let character of currentArrayString) {
            if (character === '"' && quoteFlag === 0) {
                quoteFlag = 1
            }
            else if (character === '"' && quoteFlag == 1) quoteFlag = 0
            if (character === ',' && quoteFlag === 0) character = '|'
            if (character !== '"') string += character
        }

        let jsonProperties = string.split("|")

        for (let j in headers) {
            if (jsonProperties[j].includes(",")) {
                jsonObject[headers[j]] = jsonProperties[j]
                    .split(", ").map(item => item.trim())
            }
            else jsonObject[headers[j]] = jsonProperties[j]
        }
        
        csvToJsonResult.push(jsonObject)
    }

    let result = csvToJsonResult.map((item) => {
        console.log(item)
        let nJson = {}

        nJson['sourceId'] = item.iDB + "." + item.iTB;

        if (!item.oDB) {
            nJson['destinationId'] = item.iDB + "." + item.iTB;
        } else {
            nJson['destinationId'] = item.oDB + "." + item.oTB;
        }

        if (item.partitionsReplication) {
            nJson['partitionsReplication'] = item.partitionsReplication;
        }

        if (item.structureReplication) {
            nJson['structureReplication'] = item.structureReplication;
        } else {
            nJson['structureReplication'] = false;
        }

        if (item.isView) {
            nJson['isView'] = item.isView;
        }

        console.log(nJson);
        return nJson;
    })

    let finalObj = {
        "configInfo": {
            "tables": [
                result
            ]
        }
    };

    console.log(finalObj);

    let data = JSON.stringify(finalObj);
    let filename = f.name

    filename = filename.replace(".csv", ".json")
    
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data);
    var dlAnchorElem = document.getElementById('downloadAnchorElem');

    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", filename);
    dlAnchorElem.click();
}

function readSingleFile(f) {
    console.log(f)
    let resultado
    if (f) {
        var r = new FileReader();
        r.readAsText(f);
        r.onload = function () {
            resultado = r.result
            csv2json(resultado, f)
        }

    } else {
        alert("Failed to load file");
    }
    return resultado
}
