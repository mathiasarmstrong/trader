#!/bin/sh
if [[ -f "/tmp/ampushconfig" ]]; then
  export FFPATH=$(cat "/tmp/ampushconfig")
fi
export NODE_ENV="development";
if [[ "$1" ]]; then
  export NODE_ENV="$1";
fi
if [[ "$NODE_ENV" == "development" ]]; then
  node_modules/webpack/bin/webpack.js --profile;
else
  node_modules/webpack/bin/webpack.js;
fi
