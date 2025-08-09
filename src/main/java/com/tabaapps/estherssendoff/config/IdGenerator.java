package com.tabaapps.estherssendoff.config;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.generator.BeforeExecutionGenerator;
import org.hibernate.generator.EventType;

import java.util.EnumSet;

public class IdGenerator implements BeforeExecutionGenerator {

    @Override
    public Object generate(SharedSessionContractImplementor session, Object owner, Object currentValue,
                           EventType eventType) {
        String uuid = java.util.UUID.randomUUID().toString().substring(0,18);
        String base64 = java.util.Base64.getEncoder().encodeToString(uuid.getBytes());
        return base64.replaceAll("=", "");
    }

    @Override
    public EnumSet<EventType> getEventTypes() {
        return EnumSet.of(EventType.INSERT);
    }
}
