# Use a lightweight Node.js image
FROM node:23-slim

# Install necessary Chromium dependencies
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies using Bun (if you use Bun)
RUN npm install -g bun && bun install

# Copy the rest of the app
COPY . .

# Expose the port (match your Next.js port)
EXPOSE 3000

# Start your app
CMD ["bun", "start"]
