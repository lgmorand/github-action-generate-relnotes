# github-action-generate-relnotes

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
