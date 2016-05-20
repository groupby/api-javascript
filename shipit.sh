#!/usr/bin/env bash

# This script creates a release of the JavaScript API and makes it available on the groupby CDN.

# read version number from standard in.
currentVersion=`cat package.json | jq -r .version`
echo "Type the version number that you want to use (Current version is: ${currentVersion})"
read newVersion
if [[ ! "${newVersion}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Version number must be of the form x.x.x"
  exit 1
fi

# retag package json.
sed  -ie "s/\"version\":\s*\"${currentVersion}\"/\"version\": \"${newVersion}\"/g" package.json

git add package.json
git commit -m "bumped version from ${currentVersion} --> ${newVersion}"
git push

# build distribution.
gulp build
echo "Built new versions in dist"
ls dist

# checkout gh-pages
git checkout gh-pages
git add dist
git commit -m "built and deployed version: ${newVersion}"
git push

git checkout develop
