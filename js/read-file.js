class ReaderFile {
    constructor() {}
    
    readFileWaiter(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            };
            reader.onerror = (event) => {
                reject(event);
            };
            reader.readAsText(file);
        });
    }
    readFile(file) {
        return this.readFileWaiter(file).then((result) => {
            return result
        }).catch((error) => {
            console.log(error)
        });
    }
}
export const Reader  = new ReaderFile();