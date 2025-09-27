#!/usr/bin/env bash
set -euo pipefail

# Runs npm run lint with different GAPI_MAX_PARALLEL and prints elapsed time per run as it goes.

minimumParallelValue=1
# maximumParallelValue=101 # use this to override auto-detection based on CPU cores
step=1


# Detect number of CPU cores (Linux portable attempts). Fallback to 1 if detection fails.
if [ -z "${maximumParallelValue:-}" ]; then
  if command -v nproc >/dev/null 2>&1; then
    maximumParallelValue=$(nproc)
  elif command -v getconf >/dev/null 2>&1; then
    maximumParallelValue=$(getconf _NPROCESSORS_ONLN || echo 1) # cspell:ignore getconf _NPROCESSORS_ONLN
  else
    maximumParallelValue=$(awk '/^processor/{n++}END{print n}' /proc/cpuinfo 2>/dev/null || echo 1)
  fi
fi

# Safety: ensure it is a positive integer.
if ! [[ "${maximumParallelValue}" =~ ^[0-9]+$ ]] || [ "${maximumParallelValue}" -lt 1 ]; then
  maximumParallelValue=1
fi

# Step between parallel values (can be adjusted). Must be a positive integer.
if [ "${step}" -lt 1 ]; then
  echo "step must be >= 1" >&2
  exit 1
fi

echo "Starting lint benchmarks (GAPI_MAX_PARALLEL ${minimumParallelValue}-${maximumParallelValue} step ${step})"

for parallelValue in $(seq "${minimumParallelValue}" "${step}" "${maximumParallelValue}"); do
  startTimeNanoseconds=$(date +%s%N)
  if ! GAPI_MAX_PARALLEL="${parallelValue}" npm run lint >/dev/null 2>&1; then
    echo "${parallelValue}: failed"
    exit 1
  fi
  endTimeNanoseconds=$(date +%s%N)

  elapsedNanoseconds=$(( endTimeNanoseconds - startTimeNanoseconds ))
  elapsedSeconds=$(( elapsedNanoseconds / 1000000000 ))
  elapsedMilliseconds=$(( (elapsedNanoseconds / 1000000) - (elapsedSeconds * 1000) ))

  # Print result immediately (format: X, Y.mmm)
  echo "${parallelValue}, ${elapsedSeconds}.$(printf '%03d' "${elapsedMilliseconds}")"

  # Pause between runs (skip after last run)
  if [ "${parallelValue}" -lt "${maximumParallelValue}" ]; then
    sleep 60
  fi
done
