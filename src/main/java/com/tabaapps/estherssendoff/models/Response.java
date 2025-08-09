package com.tabaapps.estherssendoff.models;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@Builder
public class Response<T> {

    private HttpStatus status;

    private String message;

    private T body;
}
