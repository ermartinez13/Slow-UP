# initializes a new build stage and sets the base image for subsequent instructions
FROM node:20
# sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow
WORKDIR /app
# copies files or directories from <src> and adds them to the filesystem of the container at the path <dest>
# paths of files and directories will be interpreted as relative to the source of the context of the build
COPY package.json /app
# since dependencies are copied first, they will be cached unless package.json changes
# execute any commands to create a new layer on top of the current image. The added layer is used in the next step in the Dockerfile
RUN npm install

COPY . /app

# sets the command to be executed when running a container from an image
CMD ["npm", "run", "dev"]