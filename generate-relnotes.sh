#!/bin/bash

LastTag=$(git describe --tags --abbrev=0)
echo $LastTag

LastCommitsMessages=$(git log $LastTag..HEAD --oneline --pretty=format:"%s")
echo $LastCommitsMessages
