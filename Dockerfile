# initializes a new build stage and sets the base image for subsequent instructions
FROM node:20
# sets the environment variable <key> to the value <value>
# value will be in the environment for all subsequent instructions in the build stage
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# execute any commands to create a new layer on top of the current image. The added layer is used in the next step in the Dockerfile
# Node tool that identifies whatever package manager is configured for project, transparently install it if needed, and run it without requiring explicit user interactions
RUN corepack enable
# sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow
WORKDIR /app
# copies files or directories from <src> and adds them to the filesystem of the container at the path <dest>
# paths of files and directories will be interpreted as relative to the source of the context of the build
COPY package.json pnpm-lock.yaml /app
# since dependencies are copied first, they will be cached unless package.json or pnpm-lock.yaml change
RUN pnpm install

COPY . /app

# sets the command to be executed when running a container from an image
CMD ["pnpm", "run", "dev"]