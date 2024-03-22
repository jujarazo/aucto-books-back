# Use the official MongoDB image
FROM mongo:latest

# Set the MongoDB data directory
VOLUME ["/data/db"]

# Expose the default MongoDB port
EXPOSE 27017

# Run the MongoDB server
CMD ["mongod"]
