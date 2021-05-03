import * as core from '@actions/core'
import * as git from './git'
import * as release from './release'
import * as text from './text'
import * as io from './io'

export async function start(): Promise<void> 
{
  try {
    // retrieving parameters
    const token = core.getInput("githubToken");
    const newTag = core.getInput("newTag"); 
    const isChangeLogEnabled = core.getInput("generateArtifact"); 

    core.debug("Token: ${token}");
    core.debug("Tag: ${newTag}");
    core.debug("Generate changelog: ${isChangeLogEnabled}");

    // retrieving tag
    const tag = await git.getLastTag();

    // retrieving history message
    if (tag != '')
    {
      const messages = await git.getCommits(tag)
      const releaseNotes = text.toList(messages);
      core.debug("Releases notes: ${releaseNotes}");
      
      // create release
      release.createRelease(newTag, token, releaseNotes);
      
      if (isChangeLogEnabled)
      {
        io.writeOutput("changelog.txt", releaseNotes);
      }
  
      // set output variable 
      core.setOutput("relnotes", releaseNotes);
    }
    
  } 
  catch (error) 
  {
    core.setFailed(error.message)
  }
}

start();
