const { defineConfig } = require("cypress");

//const xlsx = require("node-xlsx").default;
const xlsx = require('xlsx');
const fs = require("fs");
const path = require("path");
const readXlsx = require("./read-xlsx")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      // implement node event listeners here
      //----1 task log, table---------------
      on('task', {
        log(message) {
          console.log(message)

          return null
        },

        table(message) {
          console.table(message)
    
          return null
        }
      })

      //--------2 parseXlsx ----------------
      on('task', { parseXlsx({filePath})    
      { return new Promise((resolve, reject) => 
         { try 
           {

              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);

           } catch(e) {
              reject(e);
           }
          })
        } 
      })

      //---------3 readXlsx---------------
      on('task', { 
        'ReadExcel':  readXlsx.read  
      })

      //---------4 writeXlsx---------------
      on('task', { 
        'WriteExcel':  readXlsx.write  
      })
      //---------------------------
    },
  },


//-----------
  
    reporter: "mochawesome",
    reporterOptions: {
      charts: true,
      overwrite: false,
      html: false,
      json: true,
      reportDir: 'cypress/reports'
    }
  

});






