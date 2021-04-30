const core = require('@actions/core'); 
const github = require('@actions/github');

try 
{
  const previousTag = core.getInput('previousTag'); 
  
} 
catch (error) 
{
  core.setFailed(error.message);  
}
