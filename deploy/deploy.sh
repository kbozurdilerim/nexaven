#!/bin/bash

# Nexaven Website Deployment Script
# Ubuntu 24.04 LTS

set -e

echo "===================================="
echo "Nexaven Website Deployment Script"
echo "===================================="

# 1. Update System
echo "1. Updating system packages..."
sudo apt update
sudo apt upgrade -y

# 2. Install Node.js
echo "2. Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install Nginx
echo "3. Installing Nginx..."
sudo apt install -y nginx

# 4. Install SQLite3
echo "4. Installing SQLite3..."
sudo apt install -y sqlite3

# 5. Create user and directories
echo "5. Creating directories and user..."
sudo useradd -m -s /bin/bash nexaven || true
sudo mkdir -p /var/www/nexaven
sudo mkdir -p /var/log/nexaven
sudo chown -R nexaven:nexaven /var/www/nexaven
sudo chown -R nexaven:nexaven /var/log/nexaven

# 6. Copy backend
echo "6. Setting up backend..."
sudo cp -r ./backend /var/www/nexaven/
cd /var/www/nexaven/backend
sudo chown -R nexaven:nexaven /var/www/nexaven/backend
npm install --production

# 7. Copy frontend
echo "7. Building frontend..."
cd /var/www/nexaven
sudo cp -r ./frontend /var/www/nexaven/
cd /var/www/nexaven/frontend
npm install
npm run build
sudo chown -R nexaven:nexaven /var/www/nexaven/frontend

# 8. Setup Nginx
echo "8. Configuring Nginx..."
sudo cp ./deploy/nexaven.conf /etc/nginx/sites-available/nexaven.conf
sudo ln -sf /etc/nginx/sites-available/nexaven.conf /etc/nginx/sites-enabled/nexaven.conf
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# 9. Setup systemd service
echo "9. Setting up systemd service..."
sudo cp ./deploy/nexaven.service /etc/systemd/system/nexaven.service
sudo systemctl daemon-reload
sudo systemctl enable nexaven.service
sudo systemctl restart nexaven.service

# 10. Setup SSL with Let's Encrypt
echo "10. Installing SSL certificate (Let's Encrypt)..."
sudo apt install -y certbot python3-certbot-nginx
echo "Please follow the prompts to install your SSL certificate:"
sudo certbot certonly --nginx -d nexaven.com.tr -d www.nexaven.com.tr

# 11. Restart services
echo "11. Restarting services..."
sudo systemctl restart nginx
sudo systemctl restart nexaven.service

echo "===================================="
echo "Deployment Complete!"
echo "===================================="
echo ""
echo "Your website is ready at: https://nexaven.com.tr"
echo ""
echo "Admin Panel: https://nexaven.com.tr/admin"
echo "Login with admin credentials."
echo ""
echo "Useful commands:"
echo "  sudo systemctl status nexaven"
echo "  sudo systemctl restart nexaven"
echo "  tail -f /var/log/nexaven/backend.log"
