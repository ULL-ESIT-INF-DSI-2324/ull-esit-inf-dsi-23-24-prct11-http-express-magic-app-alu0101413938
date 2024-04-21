import fs from 'fs';
import path from 'path';
export class FileManager {
    static instance;
    constructor() {
    }
    static Instance() {
        if (this.instance == null) {
            this.instance = new FileManager();
        }
        return this.instance;
    }
    writeOnFile(filePath, express, card, callback) {
        let refuse = false;
        let directory = `database/${filePath.toLocaleLowerCase()}`;
        if (express) {
            directory = filePath;
        }
        const fullPath = `${directory}/${card.id}.json`;
        const data = JSON.stringify(card, null, 2);
        this.pathExist(directory, (existPath) => {
            if (existPath) {
                this.fileExist(fullPath, (existFile) => {
                    if (!existFile) {
                        fs.writeFile(fullPath, data, (err) => {
                            if (err) {
                                refuse = true;
                                console.error(`Error al escribir datos en el archivo. Error: ${err.code}, Operacion: ${err.syscall}`);
                            }
                            callback(refuse);
                        });
                    }
                    else {
                        refuse = true;
                        callback(refuse);
                    }
                });
            }
            else {
                refuse = true;
                callback(refuse);
            }
        });
    }
    removeFromFile(filePath, idToRemove, express, callback) {
        let refuse = false;
        let directory = `database/${filePath.toLocaleLowerCase()}`;
        if (express) {
            directory = filePath;
        }
        const fullPath = `${directory}/${idToRemove}.json`;
        fs.unlink(fullPath, (err) => {
            if (err) {
                refuse = true;
                console.error(`Error al eliminar cartas coincidentes del archivo. Error: ${err.code}, Operacion: ${err.syscall}`);
            }
            callback(refuse);
        });
    }
    updateFile(filePath, card, express, callback) {
        this.removeFromFile(filePath, card.id, express, (refuseRemove) => {
            if (refuseRemove) {
                callback(refuseRemove);
            }
            else {
                this.writeOnFile(filePath, express, card, (refuseWrite) => {
                    callback(refuseWrite);
                });
            }
        });
    }
    readFile(filePath, idToShow, express, callback) {
        let refuse = false;
        let directory = `database/${filePath.toLocaleLowerCase()}`;
        if (express) {
            directory = filePath;
        }
        const fullPath = `${directory}/${idToShow}.json`;
        fs.readFile(fullPath, 'utf-8', (err, data) => {
            if (err) {
                refuse = true;
                console.error(`Error al mostrar carta coincidentes del archivo. Path: ${filePath} Error: ${err.code}, Operacion: ${err.syscall}`);
                callback(refuse, undefined);
            }
            else {
                const { user, id, name, mana, color, line, rarity, rules, price, special } = JSON.parse(data);
                const showCard = {
                    cardOwner: user, id: id, name: name, mana: mana,
                    color: color, line: line, rarity: rarity,
                    rules: rules, price: price, special: special
                };
                callback(refuse, showCard);
            }
        });
    }
    // readMultipleFiles(filePath :string, callback :(refuse :boolean, showCards :CardData[] | undefined) => void) :void {
    readMultipleFiles(filePath, fromExpress, callback) {
        let directory = `database/${filePath.toLocaleLowerCase()}`;
        if (fromExpress)
            directory = filePath;
        let refuse = false;
        fs.access(directory, fs.constants.F_OK, (err) => {
            console.log(`No hay ruta: ${directory}`);
            if (err) {
                refuse = true;
                callback(refuse, undefined);
            }
            else {
                fs.readdir(directory, (err, files) => {
                    if (err) {
                        refuse = true;
                        console.error('Error al leer el directory:', err);
                        callback(refuse, undefined); // Error al leer el directory, se establece refuse en true y no hay cartas
                    }
                    const cards = [];
                    let alreadyReadedFiles = 0;
                    files.forEach(file => {
                        const rutaArchivo = path.join(directory, file);
                        fs.readFile(rutaArchivo, 'utf8', (err, content) => {
                            if (err) {
                                console.error(`Error al leer el file ${rutaArchivo}:`, err);
                                alreadyReadedFiles++;
                                if (alreadyReadedFiles === files.length) {
                                    refuse = true;
                                    callback(refuse, undefined); // Error al leer files, se establece refuse en true y no hay cartas
                                }
                            }
                            try {
                                const data = JSON.parse(content);
                                cards.push(data);
                            }
                            catch (parseError) {
                                refuse = true;
                                console.error(`Error al parsear el content del archivo ${rutaArchivo}:`, parseError);
                                callback(refuse, undefined); // Error al leer files, se establece refuse en true y no hay cartas
                            }
                            alreadyReadedFiles++;
                            if (alreadyReadedFiles === files.length) {
                                callback(refuse, cards); // Todos los files han sido leídos correctamente
                            }
                        });
                    });
                });
            }
        });
    }
    pathExist(path, callback) {
        let exist = true;
        fs.access(path, (err) => {
            if (err) {
                fs.mkdir(path, { recursive: true }, (err) => {
                    if (err) {
                        exist = false,
                            console.error(`Error la ruta especificada no existe. Error: ${err.code}, Operacion: ${err.syscall}`);
                    }
                });
            }
            callback(exist);
        });
    }
    fileExist(path, callback) {
        let exist = true;
        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                exist = false,
                    console.error(`Error la ruta especificada no existe. Error: ${err.code}, Operacion: ${err.syscall}`);
            }
            callback(exist);
        });
    }
}
