echo "#----- clean build directory"
rm -rf ../build/

echo "#----- clean node_modules directory"
rm -rf ../node_modules/

echo "#----- install dependencies"
yarn install

echo "#----- build react app"
yarn build

# need to have installed and logged in firebase account
echo "#----- firebase deploy"
firebase deploy

