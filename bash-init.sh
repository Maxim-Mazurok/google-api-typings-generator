#!/bin/bash
# inspired by https://stackoverflow.com/a/60438403/4536543
source ~/.bashrc # restore default terminal behaviour
if command -v nvm &> /dev/null
then
    nvm i
else
    echo "GAPI WARNING: nvm (Node Version Manager) can't be found, install it from https://github.com/nvm-sh/nvm#installing-and-updating and restart VS Code"
fi
