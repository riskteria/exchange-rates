#!/usr/bin/env bash
set -eo pipefail

case $1 in
  build)
    # The '| cat' is to trick Node that this is an non-TTY terminal
    # then react-scripts won't clear the console.
    yarn build | cat
    ;;
  build)
    yarn build
    ;;
  test)
    yarn test
    ;;
  e2e)
    yarn e2e
    ;;
  lint)
    yarn lint
    ;;
  *)
    exec "$@"
    ;;
esac
