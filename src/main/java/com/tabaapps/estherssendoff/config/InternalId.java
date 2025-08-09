package com.tabaapps.estherssendoff.config;

import org.hibernate.annotations.IdGeneratorType;

import java.lang.annotation.*;

@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({java.lang.annotation.ElementType.FIELD, ElementType.METHOD})
@IdGeneratorType(IdGenerator.class)
public @interface InternalId {
}
