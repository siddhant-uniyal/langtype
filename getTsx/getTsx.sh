# #!/bin/bash
# search_dir=./zod
# for file in $search_dir/*; do
#   echo "$file"
#   if [[ -f "$file" ]]; then
#     ext="${file##*.}"
#     if [[ "$ext" == "ts" ]]; then
#       cat "$file" > contents.txt
#     fi
#   fi
# done

#!/bin/bash
search_dir=./yt-dlp

# Clear contents.txt first (optional)
> contents.txt

# Find all regular files inside search_dir
find "$search_dir" -type f | while read -r file; do
  # cat "$file"        # print the file content
  ext="${file##*.}"  # get file extension
  if [[ "$ext" == "py" ]]; then
    cat "$file" >> contents.txt
  fi
done
