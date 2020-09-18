import * as fse from 'fs-extra';

export class DataSaver {
    private readonly data: { [key: string]: any };
    private readonly path: fse.PathLike;

    constructor(path: fse.PathLike, init: { [key: string]: any }) {
        this.path = path;
        if (!fse.existsSync(path)) {
            fse.ensureFileSync(path as string);
            fse.writeFileSync(path, JSON.stringify(init));
        }
        this.data = JSON.parse(fse.readFileSync(path).toString());
    }

    getData<T = any>(key: string): T {
        return this.data[key];
    }

    setData<T = any>(key: string, data: T) {
        this.data[key] = data;
        this.saveData();
    }

    saveData() {
        fse.writeFileSync(this.path, JSON.stringify(this.data));
    }
}
