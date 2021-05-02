import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {ExecOptions} from '@actions/exec/lib/interfaces'

/**
 * Finds the last tag in history
 */
export async function getLastTag(): Promise<string> {
    let lastTag = ""

    const options: ExecOptions = {
      listeners: {
        stdout: (data: Buffer) => {
          lastTag += data.toString().trim()
        }
      },
      silent: true,
      ignoreReturnCode: true
    }

    await exec.exec('git', 
                    ['describe',
                    '--abbrev=0',
                    '--tags'], 
                    options);
  

    
    if (lastTag == null || lastTag == '') 
    {
      core.setFailed(`No tag has been found`);
    }

    core.debug(`The last tag is ${lastTag}`);

    return lastTag;
}

/**
 * List all commit messages since last tag
 */
export async function getCommits(tag: string): Promise<string> {
    let messages = ''
 
    let tagFilter= tag+'..HEAD';
    
    const options: ExecOptions = {
      listeners: {
        stdout: (data: Buffer) => {
          messages += data.toString()
        }
      },
      silent: true,
      ignoreReturnCode: true
    }

    await exec.exec('git', 
                    ['log',
                    tagFilter,
                    '--oneline',
                    '--pretty=format:"%s"'], 
                    options);
    
    core.debug(`The commit messages are ${messages}`);

    if (messages == null || messages == '') 
    {
      core.warning(`No messages have been found`);
      messages= 'N/A';
    }

    return messages;
}