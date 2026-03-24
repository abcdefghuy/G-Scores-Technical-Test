package com.GoldenOwlAsia.G_Scores.seeder;

import com.GoldenOwlAsia.G_Scores.entity.StudentScore;
import org.springframework.stereotype.Component;

@Component
public class StudentScoreParser {

    private static final int SBD_INDEX = 0;
    private static final int TOAN_INDEX = 1;
    private static final int NGU_VAN_INDEX = 2;
    private static final int NGOAI_NGU_INDEX = 3;
    private static final int VAT_LI_INDEX = 4;
    private static final int HOA_HOC_INDEX = 5;
    private static final int SINH_HOC_INDEX = 6;
    private static final int LICH_SU_INDEX = 7;
    private static final int DIA_LI_INDEX = 8;
    private static final int GDCD_INDEX = 9;
    private static final int MA_NGOAI_NGU_INDEX = 10;

    public StudentScore parse(String csvLine) {
        String[] fields = csvLine.split(",", -1);
        return StudentScore.builder()
                .sbd(fields[SBD_INDEX].trim())
                .toan(parseScore(fields[TOAN_INDEX]))
                .nguVan(parseScore(fields[NGU_VAN_INDEX]))
                .ngoaiNgu(parseScore(fields[NGOAI_NGU_INDEX]))
                .vatLi(parseScore(fields[VAT_LI_INDEX]))
                .hoaHoc(parseScore(fields[HOA_HOC_INDEX]))
                .sinhHoc(parseScore(fields[SINH_HOC_INDEX]))
                .lichSu(parseScore(fields[LICH_SU_INDEX]))
                .diaLi(parseScore(fields[DIA_LI_INDEX]))
                .gdcd(parseScore(fields[GDCD_INDEX]))
                .maNgoaiNgu(parseText(fields[MA_NGOAI_NGU_INDEX]))
                .build();
    }

    private Double parseScore(String value) {
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : Double.parseDouble(trimmed);
    }

    private String parseText(String value) {
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
