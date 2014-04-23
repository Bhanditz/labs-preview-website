git pull
bundle exec jekyll build
cd ../europeana.github.io/
git pull
cd ../Labs
cp -R _site/* ../europeana.github.io/
cd ../europeana.github.io/
git add .
git commit -a -m "Autocommit"
git push
cd ../Labs
