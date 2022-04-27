# TaskMan
<p align="center"><img src="supert.png" alt="J" width="150"/></p>
<h2 align="center">Simple task manager</h2>

<hr>

TaskMan is a WebApp that allows the management of simple tasks, having a title, status, creation and expiration date.

# Architecture
## Backend
NodeJS app based on express webserver

###	Features:
- Express web server
- Validations ([express-validator](https://express-validator.github.io/docs))
- CORS ([express-cors](https://expressjs.com/en/resources/middleware/cors.html))
- MySQL ([mysql2](https://github.com/sidorares/node-mysql2))
- ORM, Migrations and Seeders ([Sequelize](https://sequelize.org/))
## Frontend
VueJS SPA
###	Features:
- VueJS v3
- Axios
- Notifications ([vue3-notification](https://github.com/kyvg/vue3-notification))
- Datepicker ([vue3-datepicker](https://vue3datepicker.com))
- Bootstrap
## Storage
Mysql database
### Data model
	Task Entity
		- id: int
		- title: string
		- status: string 
			(todo | inprogress | blocked | done)
		- expiration: datetime
		- created_at: datetime
		- updated_at: datetime

# Installation and local environment
## Backend services with docker
The project comes with all the configuration files needed to run the backend services using docker and docker-compose.
Having installed both tools (docker and docker-compose), the backend services can be brought up by running the next command in the root directory:
	
	docker-compose -f docker-compose.yml -f docker-compose-api.yml up
or if you just need the database:
	
	docker-compose up
	
This will spin up an instance of MySql and adminer, a lightweight database client (similar to phpmyadmin but cleaner, lighter and compatible with several RDMS).
The backend will use a config file ready with the default credentials for the mysql container.

### Without docker
	- cd api
	- npm install
	- npm run dev
With this you'll have the API server running on http://localhost:3001

## Frontend
	- cd frontend
	- npm install
	- npm run dev
With this you'll have the frontend SPA running on http://localhost:3000

## Database
The credentials needed by the api in order to connect with the database can be set in api/config/config.json, under the key "*development*".
### Migrations and seeders
There's a migration (api/migrations) to create the table and a seeder (api/seeders) to populate the table with a couple of dummy records.
 
	npx sequelize-cli db:migrate
	npx sequelize-cli db:seed:all

or if sequelize is globally installed (npm install -g sequelize-cli) you can use:

	sequelize db:migrate
	sequelize db:seed:all

Or, you can create the table manually with the snippet bellow:
	
	CREATE TABLE `tasks` (
	`id` int NOT NULL AUTO_INCREMENT,
	`title` varchar(255) DEFAULT NULL,
	`status` varchar(255) DEFAULT NULL,
	`expiration` datetime DEFAULT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	PRIMARY KEY (`id`)
	) ENGINE=InnoDB;
