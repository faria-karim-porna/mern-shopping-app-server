# Shopping App (Server)

#### Live Site : https://shopping-app-ee980.web.app/

#### Deployed REST API: https://mern-shopping-app-server-p7bccw89z-faria-karim-porna.vercel.app/

#### Client Side Github Link : https://github.com/faria-karim-porna/mern-shopping-app-client

## Overview

- A full stack web based app admin panel for a shopping site
- The application consists of four user types: Super Admin, Admin, Moderator, and User.
- Each user type possesses distinct permissions and privileges.
- Access to the system is restricted, requiring users to log in before utilizing its functionalities.

### Role based authorities

#### Super Admin

- The Super Admin has the ability to add new items, as well as edit and delete existing items.
- They can view a list of items and apply filters through a search function.
- The Super Admin can also carry out operations such as adding new admins or moderators, editing user information, and deleting users.
- They have the capability to search through the list of users.
- The Super Admin can update their own profile, but they cannot change their own access type.

#### Admin

- The Admin has the authority to add new items and modify or remove existing items.
- They can perform various operations such as adding new admins or moderators, as well as editing user information across all user types.
- They can not delete any admin
- The Admin can view and search both lists of items and users.
- They have the ability to update their own profile, including their access type.

#### Moderator

- Moderators have the capability to add new items exclusively from the item section.
- They can only add new moderators to the system.
- Moderators are limited to editing and deleting users from the users list.
- They can perform searches on both lists.
- Moderators can update their own profile, but they cannot change their own access type.
- They can not create own account rather can set up their account which is either created by the super admin or admin

#### User

- Users have the ability to view a list of items and search through it.
- They can also create their own account and update it as necessary.

## Technologies

- React

- React Router

- Redux Toolkit

- TypeScript

- Node.js

- MongoDB

- Mongoose

- Firebase Hosting

- Vercel

- Html

- CSS

- Bootstrap

- Docker

# To run in local machine

- First clone the repository to the local machine
- Write the following commands in the terminal
  ```
  npm install
  npm run start-dev
  ```

# To run using docker

- Write the following commands in the terminal

  ```
  docker pull fariakarim/mern-shopping-app-server
  docker run -p 5000:5000 fariakarim/mern-shopping-app-server
  ```

- It will open the app in localhost:5000
