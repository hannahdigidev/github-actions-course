FROM python:3.12-alpine3.19

WORKDIR /app

# Install build dependencies required for psutil
RUN apk add --no-cache \
    gcc \
    musl-dev \
    linux-headers

# Copy requirements first (better layer caching)
COPY requirements.txt .

# Upgrade pip tooling
RUN python -m pip install --upgrade pip setuptools wheel

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

CMD ["python", "/app/main.py"]
