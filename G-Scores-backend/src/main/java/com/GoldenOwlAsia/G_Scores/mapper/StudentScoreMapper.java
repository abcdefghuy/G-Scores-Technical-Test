package com.GoldenOwlAsia.G_Scores.mapper;

import com.GoldenOwlAsia.G_Scores.dto.res.ScoreResponse;
import com.GoldenOwlAsia.G_Scores.entity.StudentScore;
import org.springframework.stereotype.Component;

@Component
public class StudentScoreMapper {

    public ScoreResponse toScoreResponse(StudentScore entity) {
        return new ScoreResponse(
                entity.getSbd(),
                entity.getToan(),
                entity.getNguVan(),
                entity.getNgoaiNgu(),
                entity.getVatLi(),
                entity.getHoaHoc(),
                entity.getSinhHoc(),
                entity.getLichSu(),
                entity.getDiaLi(),
                entity.getGdcd(),
                entity.getMaNgoaiNgu()
        );
    }
}
