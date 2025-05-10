# Gojushinryu Website 
This the Website source code of Gojushinryu Website create with Nodejs and express

## Project Structure

The project is organized into two main folders:

- **sv**: This folder contains the server-side code built with Node.js and Express.
- **jobs**: This folder contains cron jobs for scheduled tasks.

## Server (sv) Folder

The `sv` folder contains all server-side code for the Gojushinryu website. It is built using Node.js and Express framework.

### Structure
- **sv/temp/**: Temporary storage directory for files that are generated during runtime but don't need to be persisted long-term
- **sv/public/**: Contains static files that are directly accessible by clients, such as images, CSS, and client-side JavaScript
- **sv/routes/**: Defines API endpoints and routes requests to appropriate controllers, organizing the application's URL structure
- **sv/_lib/middleware/**: Contains custom middleware functions that process requests before they reach route handlers (authentication, validation, logging, etc.)
- **sv/_lib/config/**: Configuration files for different environments (development, production) including database connections, API keys, and application settings
- **public/**: Root-level static assets directory accessible by clients without going through the server routing
- **sv/templates/**: Contains view templates (like EJS, Pug, or Handlebars files) used for server-side rendering of HTML
- **sv/_lib/**: Library directory containing utility functions, helper methods, and shared code used across the application
- **sv/_lib/api**: Contains API client implementations for third-party services and external APIs used by the application
- **sv/_lib/auth**: Authentication and authorization related functionality, including user login, registration, and permission management
- **sv/_lib/media**: Social media related APIs for integration with platforms like Facebook, Twitter, Instagram, etc.
- **sv/_lib/course**: Course related APIs and functionality for managing dojo classes, training schedules, and student enrollment
- **sv/_lib/mail**: Email functionality including templates, sending mechanisms, and notification systems
- **sv/_lib/models**: Database models that define the structure and relationships of data stored in the application
- **sv/_lib/model_base_function**: Base functions and utilities for database models, providing common CRUD operations and data manipulation methods
- **sv/_lib/utils**: General utility functions and helper methods used throughout the application for tasks like data formatting, validation, and common operations
### Setup

To run the server:

1. Navigate to the `sv` directory
2. Install dependencies: `npm install`
3. Start the server: `start:prod`

The server typically runs on port 3000 by default, but this can be configured in the environment variables.


## Jobs Folder

The `jobs` folder contains scripts for scheduled tasks that run automatically at specified intervals. These are implemented as cron jobs, which are time-based job schedulers in Unix-like operating systems.

### Purpose
- Automates recurring tasks such as data backups, sending email notifications, updating content, and performing maintenance operations
- Ensures critical operations happen on schedule without manual intervention
- Handles background processes that don't need to run within the main application

### Implementation
The project uses [cron-job.org](http://cron-job.org/) as the service to schedule and manage these automated tasks. This external service provides:
- Reliable execution of scheduled jobs
- Monitoring and reporting of job execution status
- Configurable scheduling options (hourly, daily, weekly, etc.)
- Failure notifications and retry mechanisms

Each script in the `jobs` folder is designed to perform a specific task and can be scheduled independently based on the requirements of that particular operation.

## AWS Deployment

The website is hosted on Amazon Web Services (AWS) EC2 instance. The application files are located in the **/root/apps/** directory on the server.

### SSH Access

To access the server via SSH, you will need to:

1. Sign in to the AWS Management Console
2. Navigate to the EC2 dashboard
3. Create a new key pair for the instance
4. Download the private key file (.pem)
5. Use the following command to connect (replace "your-key.pem" with your actual key filename):