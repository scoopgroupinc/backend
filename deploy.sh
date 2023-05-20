#!/bin/bash
cd /home/ec2-user/backend 
git pull origin development
yarn install &&
yarn build &&
pm2 restart 0