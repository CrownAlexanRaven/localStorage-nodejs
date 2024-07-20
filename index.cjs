const fs = require('fs');
const path = require('path');

module.exports = class {
    constructor(store_prefix, isAsync = false) {
        this.isAsync = isAsync;
        this.store_prefix = path.join(process.cwd(), store_prefix);

        if (this.isAsync) {
            (async () => {
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
            })();
        } else {
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
    }

    clear() {
        if (this.isAsync) {
            return (async () => {
                const clearDirectory = async (directoryPath) => {
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
                };

                try {
                    await fs.promises.access(this.store_prefix);
                    await clearDirectory(this.store_prefix);
                } catch (error) {
                    if (error.code !== 'ENOENT') {
                        throw error;
                    }
                }
            })();
        } else {
            const clearDirectorySync = (directoryPath) => {
                const files = fs.readdirSync(directoryPath);
                for (const file of files) {
                    const currentPath = path.join(directoryPath, file);
                    const stats = fs.statSync(currentPath);
                    if (stats.isDirectory()) {
                        clearDirectorySync(currentPath);
                        fs.rmdirSync(currentPath);
                    } else {
                        fs.unlinkSync(currentPath);
                    }
                }
            };

            if (fs.existsSync(this.store_prefix)) {
                clearDirectorySync(this.store_prefix);
            }
        }
    }

    removeItem(key) {
        const keypath = path.join(this.store_prefix, key);
        if (this.isAsync) {
            return (async () => {
                try {
                    await fs.promises.access(keypath);
                    await fs.promises.unlink(keypath);
                } catch (error) {
                    if (error.code !== 'ENOENT') {
                        throw error;
                    }
                }
            })();
        } else {
            if (fs.existsSync(keypath)) {
                fs.unlinkSync(keypath);
            }
        }
    }

    setItem(key, value) {
        const keypath = path.join(this.store_prefix, key);
        if (this.isAsync) {
            return fs.promises.writeFile(keypath, value, 'utf8');
        } else {
            fs.writeFileSync(keypath, value, 'utf8');
        }
    }

    getItem(key) {
        const keypath = path.join(this.store_prefix, key);
        if (this.isAsync) {
            return (async () => {
                try {
                    await fs.promises.access(keypath);
                    return await fs.promises.readFile(keypath, 'utf8');
                } catch (error) {
                    if (error.code === 'ENOENT') {
                        return null;
                    }
                    throw error;
                }
            })();
        } else {
            try {
                return fs.readFileSync(keypath, 'utf8');
            } catch (error) {
                if (error.code === 'ENOENT') {
                    return null;
                }
                throw error;
            }
        }
    }
};