<div id="top"></div>

<div align="center">
  <h3>github-action-generate-relnotes</h3>
</div>

<br/>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#brief">Brief</a></li>
    <li><a href="#description">Description</a></li>
    <li><a href="#authors">Authors</a></li>
    <li><a href="#syntax">Syntax</a></li>
  </ol>
</details>
<br/>


## Brief
<span id="brief"></span>

GitHub Action to generate release with release notes based on commits

## Status
<span id="status"></span>

[![CI](https://github.com/Zheng-Bote/github-action-generate-relnotes/actions/workflows/main.yml/badge.svg)](https://github.com/Zheng-Bote/github-action-generate-relnotes/actions/workflows/main.yml)
![ops](https://img.shields.io/badge/Status-v1.0.1_works-green)


### WARNING !!!

They updated the version of @actions/github AFTER the publication of the book. Depending on the version of the NPM module, the method is not exactly the same

| version | signature                          |
| ------- | ---------------------------------- |
| 4.X     | octokit.repos.createRelease()      |
| 5.X     | octokit.rest.repos.createRelease() |

## Description
<span id="description"></span>

GitHub Action to generate release with release notes based on commits

(currently using Node.js v20)


## Authors
<span id="authors"></span>

- [Louis-Guillaume MORAND](https://github.com/lgmorand)
- [Zheng Robert](https://www.robert.hase-zheng.net/) 

***forked*** from: [Louis-Guillaume MORAND : github-action-generate-relnotes](https://github.com/lgmorand/github-action-generate-relnotes)

***recommendation***: This book from Louis-Guillaume is the best one about Github Actions so far:
[GitHub Actions : A pratical guide](https://github.com/lgmorand/book-github-actions-content)

## Example Syntax
<span id="syntax"></span>

[Example Workflow: .github/workflows/main.yml](https://github.com/Zheng-Bote/github-action-generate-relnotes/blob/main/.github/workflows/main.yml)

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

### the end

:vulcan_salute:

<p align="right">(<a href="#top">back to top</a>)</p>
