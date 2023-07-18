#!/bin/bash

# This script waits for both the db and server services to be healthy

set -e

# Define a function to check if a service is healthy
check_service_health() {
  local service_name=$1
  local max_retries=30
  local retry_interval=5

  echo "Waiting for $service_name to be healthy..."

  for ((i = 0; i < $max_retries; i++)); do
    if docker-compose ps "$service_name" | grep -q "healthy"; then
      echo "$service_name is healthy!"
      return 0
    fi

    sleep "$retry_interval"
  done

  echo "Timed out waiting for $service_name to be healthy!"
  exit 1
}

# Wait for the db and server services to be healthy
check_service_health "db"
check_service_health "server"
