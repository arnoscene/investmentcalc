#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Create or update .htaccess for React Router
echo "Creating .htaccess file..."
cat > ./dist/.htaccess << EOL
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
EOL

# Deployment instructions
echo "
Deployment Instructions:
1. Upload the contents of the 'dist' folder to your web hosting
2. Ensure the domain appstorius.com points to the correct directory
3. Set up SSL certificate if not already configured
4. Test the application at https://appstorius.com
" 