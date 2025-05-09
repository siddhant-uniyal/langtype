#!/bin/bash
reposuff=$1
reponame=${reposuff##*/}
url="https://github.com/$reposuff.git"
# git clone $url
find "$reponame" -type f | while read -r file; do
  ext="${file##*.}"
  if [[ "$ext" == "py" ]]; then
    cat "$file" >> "contents.txt"
  fi
done

