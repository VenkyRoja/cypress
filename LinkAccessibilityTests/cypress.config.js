const { defineConfig } = require("cypress");
const { Console } = require('console')
const { Transform } = require('stream')

var str = ""
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
      on('task', {
        log(message){
          console.log(message)
          return null
        },
        'table'(nodes){
          nodes.forEach((node)=>{
            const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk, enc) } })
            const logger = new Console({ stdout: ts })

            function getTable (data) {
              logger.table(data,["IssueType", "Impact", "Description",  "Help", "Count"])
              return (ts.read() || '').toString()
            }
            function test (data){
              logger.log(data)
              return (ts.read() || '').toString()
            }
            
            var help =node.HelpUrl
            var html = node.Nodes[0].Html
            var failureSummary = node.Nodes[0].FailureSummary
            str += failureSummary
            
          })

          return str
        }
      })
    },
  },

  //-----------
  
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    saveAllAttempts: false,
    ignoreVideos: true,
    videoOnFailOnly: false, 
    inlineAssets: true,
    overwrite: false,
    html: false,
    json: true,
    reportDir: 'MyReports/mochawesome'

  }



});
