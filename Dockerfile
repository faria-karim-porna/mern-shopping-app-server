FROM node:18.16.0-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN NODE_ENV=development npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# for typescript
# RUN npm run build
# COPY .env ./dist/
# WORKDIR ./dist

EXPOSE 5000
CMD tsc && node ./dist/index.js