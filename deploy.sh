echo -e '\e[1m\e[34mEntering into frontend directory...\e[0m\n'

cd ~/compcloud

echo -e $PWD

echo -e '\e[1m\e[34mPulling code from remote...\e[0m\n'

git pull origin main

echo -e '\e[1m\e[34mAll done now!\e[0m\n'

sudo mkdir -p dist
sudo tar -xzf tmp/compcloud_build.tgz -C dist .
sudo rm -rf tmp

echo -e '\e[1m\e[34mThanks for automating this deployment process!\e[0m\n'