# ================= BUILD STAGE =================
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ================= PRODUCTION STAGE =================
FROM node:20-alpine

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80

# Copy package files to install ONLY production dependencies (smaller image)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the build output from the build stage
# React Router v7 puts client/server builds inside /build
COPY --from=build /app/build ./build

# Expose the port we set in ENV
EXPOSE 80

# Start the server
CMD ["npm", "run", "start"]