# Dockerfile
ARG PW_VER=1.55.0
FROM mcr.microsoft.com/playwright:v${PW_VER}-jammy

WORKDIR /app

# set where tests should write results (mounted in ACI)
ENV RESULTS_DIR=/results

# copy package manifest and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# copy source (tests, config)
COPY . .

# ensure Playwright browsers are present (base image usually already has them)
RUN npx playwright install --with-deps || true

# Make results dir writable (when not mounted). This chmod is fine because we run container as root.
RUN mkdir -p ${RESULTS_DIR} && chmod -R 777 ${RESULTS_DIR}

# We run as root so ACI-mounted Azure File Shares are writeable (avoids permission issues).
USER root

# default command runs the Playwright test runner
CMD ["npx", "playwright", "test", "--reporter=list"]
