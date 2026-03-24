package com.GoldenOwlAsia.G_Scores.service;

import com.GoldenOwlAsia.G_Scores.dto.res.ScoreResponse;

public interface ScoreService {

    ScoreResponse findByRegistrationNumber(String sbd);
}
