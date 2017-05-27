#!/bin/sh
export NODE_ENV="dev";
export PARTNER="";
for var in $@
do
  case $var in
    "prod")
      NODE_ENV="production";;
    "production")
      NODE_ENV="production";;
    "stage")
      NODE_ENV="production";;
    "staging")
      NODE_ENV="production";;
    *)
      PARTNER=$var
  esac
done
echo "NODE_ENV $NODE_ENV"
echo "PARTNER $PARTNER"
node_modules/webpack/bin/webpack.js --watch
