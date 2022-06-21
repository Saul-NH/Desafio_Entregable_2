const fs = require('fs');

class Contenedor {
    constructor(filename) {
        this.filename = filename;
    }

    async save(product) {
        try {
            let content = await this.readFile();
            product.id = this.buildId(content);

            content.push(product);

            this.writeFile(content);

            return product.id;
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        let content = await this.readFile();
        content = content.filter((product) => product.id === id);
        return content.length == 0 ? null : content;
    }

    getAll() {
        return this.readFile();
    }

    async deleteById(id) {
        let content = await this.readFile();
        this.writeFile(content.filter((product) => product.id !== id));
    }

    async deleteAll() {
        this.writeFile([]);
    }

    async readFile() {
        return JSON.parse(await fs.promises.readFile(this.filename, 'utf-8'));
    }

    async writeFile(content) {
        await fs.promises.writeFile(this.filename, JSON.stringify(content));
    }

    buildId(content) {
        try {
            if (content.length === 0) {
                return 1;
            } else {
                content.sort((a, b) => (a.id > b.id ? 1 : -1));
                return content[content.length - 1].id + 1;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Contenedor;