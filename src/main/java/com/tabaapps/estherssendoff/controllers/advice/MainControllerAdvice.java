package com.tabaapps.estherssendoff.controllers.advice;

import com.tabaapps.estherssendoff.exceptions.InternalException;
import com.tabaapps.estherssendoff.models.Response;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;

/**
 * Global exception handler for controller exceptions
 */
@Slf4j
@RestControllerAdvice
public class MainControllerAdvice {

    /**
     * Handles authentication exceptions (401 Unauthorized)
     *
     * @param ex Authentication exception
     * @return Error response
     */
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Response<Void> handleAuthenticationException(AuthenticationException ex) {
        log.error("Authentication error: {}", ex.getMessage());
        return Response.<Void>builder()
                .status(HttpStatus.UNAUTHORIZED)
                .message("Authentication failed: " + ex.getMessage())
                .build();
    }

    /**
     * Handles access denied exceptions (403 Forbidden)
     *
     * @param ex Access denied exception
     * @return Error response
     */
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Response<Void> handleAccessDeniedException(AccessDeniedException ex) {
        log.error("Access denied: {}", ex.getMessage());
        return Response.<Void>builder()
                .status(HttpStatus.FORBIDDEN)
                .message("Access denied: " + ex.getMessage())
                .build();
    }


    /**
     * Handles all other exceptions (500 Internal Server Error)
     *
     * @param ex Exception
     * @return Error response
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Response<Void> handleGeneralException(Exception ex) {
        log.error("Internal server error: ", ex);
        return Response.<Void>builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .message("An internal server error occurred: " + ex.getMessage())
                .build();
    }


    /**
     * Handles custom internal exceptions with specific status codes
     */
    @ExceptionHandler(InternalException.class)
    public ResponseEntity<Response<Void>> handleInternalException(InternalException e) {
        log.error("Internal exception: {}", e.getMessage(), e);
        Response<Void> response = Response.<Void>builder()
                .status(e.getStatus())
                .message(e.getMessage())
                .build();
        return new ResponseEntity<>(response, e.getStatus());
    }

    /**
     * Handles entity not found exceptions
     */
    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Response<Void>> handleEntityNotFoundException(EntityNotFoundException e) {
        log.error("Entity not found: {}", e.getMessage(), e);
        Response<Void> response = Response.<Void>builder()
                .status(HttpStatus.NOT_FOUND)
                .message(e.getMessage())
                .build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles validation exceptions for request bodies
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Response<Map<String, String>>> handleValidationExceptions(MethodArgumentNotValidException e) {
        log.error("Validation error: {}", e.getMessage());
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        Response<Map<String, String>> response = Response.<Map<String, String>>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message("Validation failed")
                .body(errors)
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles missing request parameter exceptions
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Response<Void>> handleMissingParams(MissingServletRequestParameterException e) {
        log.error("Missing parameter: {}", e.getMessage());
        Response<Void> response = Response.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message(String.format("Missing required parameter: %s", e.getParameterName()))
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles type mismatch exceptions for parameters
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Response<Void>> handleTypeMismatch(MethodArgumentTypeMismatchException e) {
        log.error("Type mismatch: {}", e.getMessage());
        Response<Void> response = Response.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message(String.format("Parameter '%s' has invalid value: %s",
                        e.getName(), e.getValue()))
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
