const fs = require("fs");
const xlsx = require('xlsx');

//---------1----------------------------------
const read = ({file, sheetname}) => {

    const buf = fs.readFileSync(file);
    console.log('File location = ' + file );
    console.log('Sheet Name = ' + sheetname );
    
    const workbook = xlsx.read(buf, {type: 'buffer'});
    
    //const rows = xlsx.utils.sheet_to_json(workbook, {header: ['A', 'B', 'C'], blankrows: false });

    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);

    return rows
}

//-------------2----------------------------------
const write = ({jsonData, sheername, filepath}) => {
    try {
        const ws = xlsx.utils.json_to_sheet(jsonData);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, sheername);
        xlsx.writeFile(wb, filepath);
        console.log("Success")
        return true;
    } catch(e) {
        console.log("No success")
        return false;
    }   
     
}


//-------------------------------------
module.exports = {
    read, write,
}