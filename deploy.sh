./gradlew -x test clean build
docker build -t registry.tabaapps.com/esthers-sendoff-api:1.0.0 .
docker push registry.tabaapps.com/esthers-sendoff-api:1.0.0