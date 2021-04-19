'use strict';

const fs = require('fs-extra');
const {join} = require('path');

const loadSqlQueries = async (folderName) => {
    const filePath = path.join(process.cwd(), 'data', folderName);
    const files = await fs.readdir(filePath);
    const sqlFile = await files.filter(f => f.endsWith('.sql'));
    const queries = {};

    for (const sqlFile of sqlFile){
        const query = await fs.readFileSync(join(filePath, sqlFile), {encoding: 'utf8'});
        queries[sqlFile.replace(".sql"),""]= query;
    }

    return queries;
}

module.exports = {
    loadSqlQueries
}