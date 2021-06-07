# github-action-generate-relnotes


## WARNING !!!

They updated the version of @actions/github AFTER the publication of the book. Depending on the version of the NPM module, the method is not exactly the same

| version | signature |
|--|---|
|4.X|octokit.repos.createRelease()|
|5.X|octokit.rest.repos.createRelease()|

## Description

Sample GitHub Action to generate release notes based on commits


``` yaml
- uses: actions/checkout@v2
  with:
    fetch-depth: 0

- name: Generate release + changelog
  id: relnotes
  uses: ./
  with:
    githubToken: ${{ secrets.GITHUB_TOKEN }}
    newTag: ${{ github.event.inputs.tag }}
    generateArtifact: true
```
