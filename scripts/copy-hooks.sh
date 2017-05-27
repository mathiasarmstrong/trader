#!/bin/sh
echo --------------------------------------PERMISSION NOTES-----------------------------------------
echo "${GREEN}setting write permissions for scripts/*.sh${NC}"
echo -----------------------------------------------------------------------------------------------
chmod +x scripts/*.sh;

RED="\033[0;31m"
GREEN="\033[0;32m"
NC="\033[0m"

NVM_COMMAND_NOT_RUN=false

echo "${GREEN}Empty .git/hooks folder to not deal with overwrites${NC}"
rm ./.git/hooks/*

echo "${GREEN}Copying hook scripts to .git/hooks${NC}"
cp ./scripts/hooks/* ./.git/hooks

if (nvm alias default stable) ; then
  echo"${GREEN}nvm alias default stable fix implemented${NC}"
else
  NVM_COMMAND_NOT_RUN=true
fi

echo --------------------------------------COMPLETION NOTES-----------------------------------------
echo "${GREEN}Make sure your sublime linter settings osx path is set (if you are using nvm)${NC}"
echo "${GREEN}This can be found in sublimelinter user settings, and looks similar to:${NC}"
echo "${GREEN}/Users/dj/.nvm/versions/node/v6.5.0/bin${NC}"
if [ $NVM_COMMAND_NOT_RUN ]; then
  echo "${RED}nvm alias default stable fix could not be performed, if you are using NVM${NC}"
  echo "${RED}you will need to run this command manually 'nvm alias default stable'${NC}"
fi
echo -----------------------------------------------------------------------------------------------
