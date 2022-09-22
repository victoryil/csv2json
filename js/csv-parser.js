class CsvParser {
    constructor(){

    }
    csv2json(csv) {
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
        let result = csvToJsonResult
    
        if (document.getElementById('skMirroning').checked) {
            result = csvToJsonResult.map((item) => {
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
            result = {
                "configInfo": {
                    "tables": [
                        result
                    ]
                }
            };
        }
    
        return JSON.stringify(result);
    }
}
export const Parser = new CsvParser();