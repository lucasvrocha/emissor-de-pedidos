

export class DataBaseStorage {

    private driver = localStorage;
    private name;

    constructor(name: string, data: any[]) {
        this.name = name;
        this.create(data);
    }

    create(data: any[]) {
        if (!this.data)
            this.data = data;
    }

    set data(data: any[]) {
        this.driver.setItem('tb-' + this.name, JSON.stringify(
            data.sort(function comp(a, b) {
                if (a.id > b.id) return 1;
                if (a.id < b.id) return -1;
                return 0;
            })
        ));
    }

    get data(): any[] {
        return JSON.parse(this.driver.getItem('tb-' + this.name));
    }

    insert(object) {
        let data = this.data;
        data.push(object);
        this.data = data;
    }

    update(object) {
        this.delete(object);
        this.insert(object);
    }

    delete(object): any {
        let removed = null;
        let index = this.data.findIndex(x => x['id'] === object['id']);
        if (index >= 0) {
            let data = this.data;
            removed = data.splice(index, 1);
            this.data = data;
        }
        return removed;
    }
}