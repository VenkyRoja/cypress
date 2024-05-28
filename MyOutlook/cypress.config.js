const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

module.exports = defineConfig({
  e2e: {

    setupNodeEvents(on, config) {
      
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

      //----2 registering terminal log---------------
      require('cypress-terminal-report/src/installLogsPrinter')(on);
      

      //----3 File copy---------------

      
      on('task', {
            copyFile({ src, dest }) {
                return fs.copy(src, dest)
                    .then(() => 'File copied successfully')
                    .catch(err => {
                        throw new Error(`Failed to copy file: ${err.message}`);
                    });
            }
      });
  
        
      //----------------------------------

    }, //setupnode ends
  }, // e2e dnds
}); //definedonfig ends









/*-------------------------Delete this later---------------------------------------------
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


-----------------------------------------------------------------------*/