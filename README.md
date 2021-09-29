# User management system

### Packages required

- PHP 8.0 (php8.0-mysql, composer)
- Node 14+ (yarn)
- MySQL server

### Setting up a dev environment

Update the MySQL credentials in .env. You can create the users table by making use of the `schema.sql` file.
In order to build the React App, run `yarn` to install all the dependencies. Then `yarn start` will start a development server.
For the PHP server, you can run `composer run start` (or `php -S localhost:8000 server/src/index.php` if composer is not available)
The endpoint for the PHP can be configured in `src/config.json`

### Setting up a production environment

On a server with Apache set up:
`yarn build` will allow CRA to output an optimized `build` folder, the contents can then be placed in `/var/www/html`.
Copying the contents of `/server` into `/var/www/html` will automatically route calls meant for the API to PHP using `.htaccess`.

### Setting up using containers

Using docker-compose, we could set up a containerized environment that automatically builds, deploys and hosts this project.
Note: not currently working and only added as an example
