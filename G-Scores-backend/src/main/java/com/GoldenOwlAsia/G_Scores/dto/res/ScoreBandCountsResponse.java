package com.GoldenOwlAsia.G_Scores.dto.res;

public record ScoreBandCountsResponse(
        long gte8,
        long gte6lt8,
        long gte4lt6,
        long lt4
) {}