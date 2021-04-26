
currentDir=$(pwd)

echo "Starting at ${currentDir}"

echo "Starting container"
npm --prefix "${currentDir}/packages/container" run start &

npm --prefix "${currentDir}/packages/auth" run start &

npm --prefix "${currentDir}/packages/marketing" run start &

npm --prefix "${currentDir}/packages/dashboard" run start &