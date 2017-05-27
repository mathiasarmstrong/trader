#!/bin/sh
if [[ -f "/tmp/ampushconfig" ]]; then
  export FFPATH=$(cat "/tmp/ampushconfig")
fi
export NODE_ENV="development";
export START_SERVER="true";

[[ "$1" == "open" ]] && export START_SERVER="open";

[[ "$@" == "production" ]] && export NODE_ENV="production";

[[ "$@" == "mock" ]] && export MOCK="true";

node_modules/webpack-dev-server/bin/webpack-dev-server.js
