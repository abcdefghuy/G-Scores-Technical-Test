package com.GoldenOwlAsia.G_Scores.controller;

import com.GoldenOwlAsia.G_Scores.dto.res.ScoreResponse;
import com.GoldenOwlAsia.G_Scores.service.ScoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/scores")
@RequiredArgsConstructor
@Tag(name = "Score Lookup", description = "Look up student scores by registration number (SBD)")
public class ScoreController {

    private final ScoreService scoreService;

    @GetMapping("/{sbd}")
    @Operation(summary = "Get a student's full score card by registration number")
    public ResponseEntity<ScoreResponse> getScoreByRegistrationNumber(
            @Parameter(description = "Student registration number (SBD)", example = "01000001")
            @PathVariable String sbd) {
        return ResponseEntity.ok(scoreService.findByRegistrationNumber(sbd));
    }
}
