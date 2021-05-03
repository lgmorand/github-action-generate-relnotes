import * as core from '@actions/core'
import * as github from '@actions/github'
import * as text from './text'

export async function createRelease(
  newTag: string,
  repoToken: string,
  releaseNotes: string
): Promise<string> {
  const octokit = github.getOctokit(repoToken);

  const response = await octokit.repos.createRelease({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    tag_name: newTag, // our tag
    name: newTag,   // our tag
    body: releaseNotes, // our comments
  })

  if (response.status != 201) {
    throw new Error(`Failed to create the release: ${response.status}`)
  }

  core.info(`Created release ${response.data.name}`)

  return response.data.html_url
}
