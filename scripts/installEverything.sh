
currentDir=$(pwd)

echo "Starting at ${currentDir}"

echo "Installing container"
cd "${currentDir}/packages/container"
npm i

echo "Installing auth"
cd "${currentDir}/packages/auth"
npm i

echo "Installing marketing"
cd "${currentDir}/packages/marketing"
npm i

echo "Installing dashboard"
cd "${currentDir}/packages/dashboard"
npm i