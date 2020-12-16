#!/bin/bash

if [ ! -d "node_modules" ]; 
then
    echo "Install dependencies"
    yarn install
fi

exec "$@";