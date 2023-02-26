#!/bin/bash
clear
rm -r common-layer node-modules-layer dist
npm install
clear
tsc
# node modules layer
mkdir -p node-modules-layer/nodejs
mv node_modules node-modules-layer/nodejs/
# common layer
mkdir -p common-layer/nodejs
mv dist/common/* common-layer/nodejs/
rm -r dist/common
sam local start-api --port 8080
