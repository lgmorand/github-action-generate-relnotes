# github-action-generate-relnotes

## WARNING !!!

They updated the version of @actions/github AFTER the publication of the book. Depending on the version of the NPM module, the method is not exactly the same

| version | signature                          |
| ------- | ---------------------------------- |
| 4.X     | octokit.repos.createRelease()      |
| 5.X     | octokit.rest.repos.createRelease() |

## Description

Sample GitHub Action to generate release notes based on commits

(see also: .github/workflows/main.yml)

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
    fetch-tags: true

- name: Generate release + changelog
  id: relnotes
  uses: ./
  with:
    githubToken: ${{ secrets.GITHUB_TOKEN }}
    newTag: ${{ github.event.inputs.tag }}
    generateArtifact: true
```

## Comment

a comment from a [user/reader](https://github.com/Zheng-Bote/):

This book from Louis-Guillaume is the best one about Github Actions:
[GitHub Actions : A pratical guide](https://github.com/lgmorand/book-github-actions-content)
