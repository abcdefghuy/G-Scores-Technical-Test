package com.GoldenOwlAsia.G_Scores.model;

public enum ScoreLevel {

    EXCELLENT("≥ 8 điểm"),
    GOOD("6 - 8 điểm"),
    AVERAGE("4 - 6 điểm"),
    WEAK("< 4 điểm");

    private final String label;

    ScoreLevel(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }

    public static ScoreLevel of(double score) {
        if (score >= 8.0) return EXCELLENT;
        if (score >= 6.0) return GOOD;
        if (score >= 4.0) return AVERAGE;
        return WEAK;
    }
}
