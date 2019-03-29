sudo npm install pm2@latest -g
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
pm2 save
sudo systemctl start pm2-ubuntu
systemctl status pm2-sammy
sudo apt install nginx
sudo ufw allow 'Nginx HTTP'
sudo systemctl enable nginx