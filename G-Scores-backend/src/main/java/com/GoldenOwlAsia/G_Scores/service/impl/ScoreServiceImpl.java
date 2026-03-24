package com.GoldenOwlAsia.G_Scores.service.impl;

import com.GoldenOwlAsia.G_Scores.dto.res.ScoreResponse;
import com.GoldenOwlAsia.G_Scores.exception.StudentNotFoundException;
import com.GoldenOwlAsia.G_Scores.mapper.StudentScoreMapper;
import com.GoldenOwlAsia.G_Scores.repository.StudentScoreRepository;
import com.GoldenOwlAsia.G_Scores.service.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScoreServiceImpl implements ScoreService {

    private final StudentScoreRepository scoreRepository;
    private final StudentScoreMapper mapper;

    @Override
    public ScoreResponse findByRegistrationNumber(String sbd) {
    return scoreRepository.findById(sbd)
                .map(mapper::toScoreResponse)
        .orElseThrow(() -> new StudentNotFoundException(sbd));
    }
}
