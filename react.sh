#!/usr/bin/env bash
rm -rf rubber-web
echo "Clone from github"
git clone https://github.com/robinker/rubber-web.git
echo ""
echo ""
echo "Clone finished, Start build static file"
echo ""
cd ./rubber-web/
npm install
npm run build
echo "Build finished! React are ready."
