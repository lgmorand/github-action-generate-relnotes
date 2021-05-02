import * as core from '@actions/core'
import * as git from './git'
import * as release from './release'
import * as text from './text'
import * as io from './io'

export async function start(): Promise<void> {
  try {
    // retrieving token
    const token = core.getInput("githubToken");
   
    // retrieving newTag
    const newTag = core.getInput("newTag"); 

    // retrieving artifact mode
    const isChangeLogEnabled = core.getInput("generateArtifact"); 

    // retrieving tag
    const tag = await git.getLastTag();

    // retrieving history message
    const messages = await git.getCommits(tag)
    const releaseNotes = text.toList(messages);
    core.debug(releaseNotes);
    
    // create release
    release.createReleaseDraft(newTag, token, releaseNotes);
    
    if (isChangeLogEnabled)
    {
      io.writeOutput("changelog.txt", releaseNotes);
    }

    // set output variable 
    core.setOutput("relnotes", releaseNotes);
  } 
  catch (error) 
  {
    core.setFailed(error.message)
  }
}

start();