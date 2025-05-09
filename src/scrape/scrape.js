import axios from "axios"
import * as cheerio from "cheerio"
import { exec } from 'child_process'

// Function to execute the Bash script
function runBashScript(scriptPath, args = []) {
  return new Promise((resolve, reject) => {
    const command = `${scriptPath} ${args.join(' ')}`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
    });
  });
}

// Usage
const scriptPath = './getContent.sh';
const args = ['canner/wrenai'];

// runBashScript(scriptPath, args)
//   .then((output) => {
//     console.log('Bash script output:');
//     console.log(output);
//   })
//   .catch((error) => {
//     console.error('Error running Bash script:', error);
//   });

const getLangRepo = async (lang) => {
    await axios.get(`https://github.com/trending/${lang}?since=weekly`).then((res) => {
        const $ = cheerio.load(res.data)
        $(".Box-row").children("h2").children("a").each((idx , el) => {
            // console.log(el.attribs.href)
            runBashScript("./getContent.sh", [el.attribs.href])
              .then((output) => {
                console.log("Bash script output:");
                console.log(output);
              })
              .catch((error) => {
                console.error("Error running Bash script:", error);
              });
        })
    })
}

getLangRepo("python")