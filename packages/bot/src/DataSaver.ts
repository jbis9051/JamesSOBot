import * as fse from 'fs-extra';

export class DataSaver<T> {
    private readonly data: { [key: string]: T };
    private readonly path: fse.PathLike;

    constructor(path: fse.PathLike, init: { [key: string]: T }) {
        this.path = path;
        if (!fse.existsSync(path)) {
            fse.ensureFileSync(path as string);
            fse.writeFileSync(path, JSON.stringify(init));
        }
        this.data = JSON.parse(fse.readFileSync(path).toString());
    }

    getData(key: string) {
        return this.data[key];
    }

    setData(key: string, data: string | any) {
        this.data[key] = data;
        this.saveData();
    }

    saveData() {
        fse.writeFileSync(this.path, JSON.stringify(this.data));
    }
}
