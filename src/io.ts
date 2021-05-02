import * as core from '@actions/core'
import * as fs from 'fs'

/**
 * Writes into a fil
 */
 export function writeOutput(
    outputFile: string, text: string
  ): void 
  {
    if (outputFile && text) {

      core.debug(`Writing into '${outputFile}'`)

      try 
      {
        fs.writeFileSync(outputFile, text)
      } 
      catch (error) 
      {
        core.warning(`Could not write file - ${error.message}`)
      }
    }
  }