const core = require('@actions/core'); 
const github = require('@actions/github');
const exec = require('@actions/exec');

async function doTheJob() {
  try 
  {
    const previousTag = core.getInput('previousTag'); 
    
    // Get Last tag
  
    let lastTag = await getLastTag();
    console.log("LastTag:"+lastTag);  
  
    // // List commits
    // let messages = await getCommitsComments(lastTag);
    // console.log(messages); 
  
    // Generate release notes 
  } 
  catch (error) 
  {
    core.setFailed(error.message);  
  }
}



async function getLastTag(){
   return await exec.exec('git', ['describe',
                                    '--abbrev=0',
                                    '--tags']);
}

async function getCommitsComments(tag) {
  let tagParam = tag+'..HEAD';
  console.log(tagParam); 
  return await exec.exec('git', ['log',
                                  tagParam,  
                                  '--oneline',
                                  '--pretty=format:"%s"']);
}

function generateReleaseNotes(){


}

doTheJob();