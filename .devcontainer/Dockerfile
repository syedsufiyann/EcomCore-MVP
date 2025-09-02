# Use a specific version of Node.js that includes npm
FROM mcr.microsoft.com/devcontainers/javascript-node:22-bullseye

# Install Git LFS
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git-lfs

# Initialize Git LFS for your user
RUN git lfs install

# Set the working directory for your application
WORKDIR /workspaces/${localWorkspaceFolderBasename}

# You can add more commands here if your application needs additional dependencies
# For example, if your app has specific setup commands, you can add them here, e.g.:
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# CMD ["npm", "start"]