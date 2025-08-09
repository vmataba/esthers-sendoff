package com.tabaapps.estherssendoff.controllers;

import com.tabaapps.estherssendoff.exceptions.InternalException;
import com.tabaapps.estherssendoff.models.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import jakarta.persistence.EntityNotFoundException;
import java.util.HashMap;
import java.util.Map;

/**
 * Global exception handler for the application.
 * Provides centralized exception handling across all controllers.
 */
@ControllerAdvice
public class MainControllerAdvice {
    
    private static final Logger logger = LoggerFactory.getLogger(MainControllerAdvice.class);

    /**
     * Handles custom internal exceptions with specific status codes
     */
    @ExceptionHandler(InternalException.class)
    public ResponseEntity<Response<Void>> handleInternalException(InternalException e) {
        logger.error("Internal exception: {}", e.getMessage(), e);
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
        logger.error("Entity not found: {}", e.getMessage(), e);
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
        logger.error("Validation error: {}", e.getMessage());
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
        logger.error("Missing parameter: {}", e.getMessage());
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
        logger.error("Type mismatch: {}", e.getMessage());
        Response<Void> response = Response.<Void>builder()
                .status(HttpStatus.BAD_REQUEST)
                .message(String.format("Parameter '%s' has invalid value: %s", 
                        e.getName(), e.getValue()))
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Fallback handler for all other exceptions
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<Response<Void>> handleException(Exception e) {
        logger.error("Unhandled exception occurred", e);
        Response<Void> response = Response.<Void>builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .message("An unexpected error occurred. Please try again later.")
                .build();
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
