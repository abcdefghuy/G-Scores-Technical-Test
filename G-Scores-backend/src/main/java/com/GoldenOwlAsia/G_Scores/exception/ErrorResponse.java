package com.GoldenOwlAsia.G_Scores.exception;

import java.time.Instant;

public record ErrorResponse(
        int status,
        String error,
        String path,
        Instant timestamp
) {}
