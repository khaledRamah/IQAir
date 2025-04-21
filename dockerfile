# Base image
FROM node:20.14.0 AS base

WORKDIR /usr/src/app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# ========== Development ==========
FROM base AS development
ENV NODE_ENV=development

# Install dev dependencies & tools
RUN npm install --only=development

# Expose NestJS port
EXPOSE 3000

# Start in dev mode with hot reload
CMD ["npm", "run", "start:dev"]

# ========== Production ==========
FROM base AS production
ENV NODE_ENV=production

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
