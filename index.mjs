// index.mjs

import * as fs from 'fs';
import * as path from 'path';

export class localStorageAsync {
    constructor(store_prefix) {
        this.store_prefix = path.join(process.cwd(), store_prefix);
        this.init(); // Call async initialization method
    }

    async init() {
        try {
            const stats = await fs.promises.stat(this.store_prefix);
            if (!stats.isDirectory()) {
                throw new Error(`${this.store_prefix} is not a directory! Remove it or rename it to create the localStorage object!`);
            }
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('Creating localStorage database.');
                await fs.promises.mkdir(this.store_prefix);
            } else {
                throw error;
            }
        }
    }

    async clear() {
        async function clearDirectory(directoryPath) {
            const files = await fs.promises.readdir(directoryPath);
            for (const file of files) {
                const currentPath = path.join(directoryPath, file);
                const stats = await fs.promises.stat(currentPath);
                if (stats.isDirectory()) {
                    await clearDirectory(currentPath);
                    await fs.promises.rmdir(currentPath);
                } else {
                    await fs.promises.unlink(currentPath);
                }
            }
        }

        if (await fs.promises.existsSync(this.store_prefix)) {
            const files = await fs.promises.readdir(this.store_prefix);
            for (const file of files) {
                const currentPath = path.join(this.store_prefix, file);
                const stats = await fs.promises.stat(currentPath);
                if (stats.isDirectory()) {
                    await clearDirectory(currentPath);
                    await fs.promises.rmdir(currentPath);
                } else {
                    await fs.promises.unlink(currentPath);
                }
            }
        }
    }

    async removeItem(key) {
        const keypath = path.join(this.store_prefix, key);
        if (await fs.promises.existsSync(keypath)) {
            await fs.promises.unlink(keypath);
        }
    }

    async setItem(key, value) {
        await fs.promises.writeFile(path.join(this.store_prefix, key), value, 'utf8');
    }

    async getItem(key) {
        const keypath = path.join(this.store_prefix, key);
        try {
            await fs.promises.access(keypath, fs.constants.F_OK);
            return fs.promises.readFile(keypath, 'utf8');
        } catch (error) {
            return 'failure'; // Return 'failure' if file doesn't exist
        }
    }
}

export class localStorageSync {
    constructor(store_prefix) {
        this.store_prefix = path.join(process.cwd(), store_prefix);
        try {
            const stats = fs.statSync(this.store_prefix);
            if (!stats.isDirectory()) {
                throw new Error(`${this.store_prefix} is not a directory! Remove it or rename it to create the localStorage object!`);
            }
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('Creating localStorage database.');
                fs.mkdirSync(this.store_prefix);
            } else {
                throw error;
            }
        }
    }

    clear() {
        const clearDirectory = (directoryPath) => {
            const files = fs.readdirSync(directoryPath);
            for (const file of files) {
                const currentPath = path.join(directoryPath, file);
                const stats = fs.statSync(currentPath);
                if (stats.isDirectory()) {
                    clearDirectory(currentPath);
                    fs.rmdirSync(currentPath);
                } else {
                    fs.unlinkSync(currentPath);
                }
            }
        };

        if (fs.existsSync(this.store_prefix)) {
            fs.readdirSync(this.store_prefix).forEach((file) => {
                const currentPath = path.join(this.store_prefix, file);
                if (fs.statSync(currentPath).isDirectory()) {
                    // Recurse into the directory
                    clearDirectory(currentPath);
                    // Delete the now-empty directory
                    fs.rmdirSync(currentPath);
                } else {
                    // Delete the file
                    fs.unlinkSync(currentPath);
                }
            });
        }
    }

    removeItem(key) {
        const keypath = path.join(this.store_prefix, key);
        if (fs.existsSync(keypath)) {
            fs.unlinkSync(keypath);
        }
    }

    setItem(key, value) {
        fs.writeFileSync(path.join(this.store_prefix, key), value, 'utf8');
    }

    getItem(key) {
        const keypath = path.join(this.store_prefix, key);
        try {
            return fs.readFileSync(keypath, 'utf8');
        } catch (error) {
            return null; // Return null if file doesn't exist
        }
    }
}