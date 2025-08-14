# Runtime stage
FROM eclipse-temurin:17-jre-alpine

RUN mkdir /app

WORKDIR /app
# Copy source code
COPY build/libs/esthers-sendoff-1.0.0.jar app.jar

# Add a non-root user to run the app
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
# Environment variables
ENV SPRING_PROFILES_ACTIVE=prod

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]