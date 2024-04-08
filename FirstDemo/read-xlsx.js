const XLSX = require("node-xlsx").default;
const fs = require("fs");
const xlsx = require('xlsx');

const read = ({file, sheetname}) => {

    const buf = fs.readFileSync(file);
    console.log('File location = ' + file );
    console.log('Sheet Name = ' + sheetname );
    
    const workbook = xlsx.read(buf, {type: 'buffer'});
    
    //const rows = xlsx.utils.sheet_to_json(workbook, {header: ['A', 'B', 'C'], blankrows: false });

    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);

    return rows
}

module.exports = {
    read,
}