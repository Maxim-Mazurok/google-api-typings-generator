#!/bin/bash
source ~/.bashrc # restore default terminal behavior
if command -v nvm &> /dev/null
then
    nvm i
else
    echo "GAPI WARNING: nvm (Node Version Manager) can't be found, install it from https://github.com/nvm-sh/nvm#installing-and-updating and restart VS Code"
fi
