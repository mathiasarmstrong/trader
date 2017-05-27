export NODE_ENV="test";

if [[ "$1" == "watch" ]]; then
  export TESTAUTO="true";
  export TESTPATH="$2";
  export PREVENT_ANGUlAR_ENV="$3";
else
  export TESTPATH="$1";
  export PREVENT_ANGUlAR_ENV="$2";
fi

[[ ! "$TESTPATH" ]] && export TESTPATH="**/*"

node_modules/karma/bin/karma start;
