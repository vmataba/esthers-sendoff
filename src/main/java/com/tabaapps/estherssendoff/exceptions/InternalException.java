package com.tabaapps.estherssendoff.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class InternalException extends RuntimeException {

    private final String message;

    private HttpStatus status;

    public InternalException(String message) {
        super(message);
        this.message = message;
    }

    public InternalException(HttpStatus status) {
        super(status.getReasonPhrase());
        this.status = status;
        this.message = status.getReasonPhrase();
    }

    public InternalException(HttpStatus status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
