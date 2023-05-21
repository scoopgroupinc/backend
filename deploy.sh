#!/bin/bash
cd /home/ec2-user/backend 
git add . && git commit -m "deploy"
git pull origin development
npm install &&
npm run build &&
pm2 restart 0