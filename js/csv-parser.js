import { pd, metaSelector, skMirroningCheck, metaType } from "./utils.js";

class CsvParser {
    constructor() { }
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

        if (skMirroningCheck.checked) {
            result = csvToJsonResult.map((item) => {
                return this.formattedJson(item);
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
    formattedJson(item) {
        let result = {};
        switch (metaType.value) {
            case "0": // database, table, view
                result['sourceId'] = item.iDB + "." + item.iTB;

                if (!item.oDB) {
                    result['destinationId'] = item.iDB + "." + item.iTB;
                } else {
                    result['destinationId'] = item.oDB + "." + item.oTB;
                }

                result['partitionsReplication'] = true;
                result['structureReplication'] = false;

                if (item.isView) {
                    result['isView'] = item.isView;
                }
                break;
            case "1": // database 
                result['sourceId'] = item.iDBTB;
                if (!item.oDBTB) {
                    result['destinationId'] = item.iDBTB;
                } else {
                    result['destinationId'] = item.oDBTB;
                }
                break;
            case "2": // database.table
                result['sourceId'] = item.iDBTB;
                if (!item.oDBTB) {
                    result['destinationId'] = item.iDBTB;
                } else {
                    result['destinationId'] = item.oDBTB;
                }

                result['partitionsReplication'] = true;
                result['structureReplication'] = false;

                if (item.isView) {
                    result['isView'] = item.isView;
                }

                break;
            default:
                result = item
                console.log("value is not valid" + metaType.value);
        }
        return result;
    }
}
export const Parser = new CsvParser();