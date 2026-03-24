package com.GoldenOwlAsia.G_Scores.seeder;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.postgresql.copy.CopyManager;
import org.postgresql.core.BaseConnection;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Value("${app.seeder.csv-path:classpath:data/diem_thi_thpt_2024.csv}")
    private String csvPath;

    private static final String CREATE_STAGING_TABLE_SQL =
            "CREATE TEMP TABLE IF NOT EXISTS student_scores_stage (LIKE student_scores INCLUDING DEFAULTS)";

    private static final String TRUNCATE_STAGING_TABLE_SQL = "TRUNCATE student_scores_stage";

    private static final String COPY_TO_STAGING_SQL =
            "COPY student_scores_stage (sbd, toan, ngu_van, ngoai_ngu, vat_li, hoa_hoc, sinh_hoc, lich_su, dia_li, gdcd, ma_ngoai_ngu) " +
            "FROM STDIN WITH (FORMAT csv, HEADER true, DELIMITER ',', NULL '')";

    private static final String MERGE_FROM_STAGING_SQL =
            "INSERT INTO student_scores (sbd, toan, ngu_van, ngoai_ngu, vat_li, hoa_hoc, sinh_hoc, lich_su, dia_li, gdcd, ma_ngoai_ngu) " +
            "SELECT sbd, toan, ngu_van, ngoai_ngu, vat_li, hoa_hoc, sinh_hoc, lich_su, dia_li, gdcd, ma_ngoai_ngu " +
            "FROM student_scores_stage ON CONFLICT (sbd) DO NOTHING";

    @Override
    public void run(String... args) {
        Long currentCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM student_scores", Long.class);
        if (currentCount != null && currentCount > 0) {
            log.info("Database already has {} rows. Skipping seed.", currentCount);
            return;
        }

        log.info("Starting data import from: {}", csvPath);
        long startedAt = System.currentTimeMillis();
        long copiedRows = importByCopy();
        Long finalCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM student_scores", Long.class);
        long elapsedMs = System.currentTimeMillis() - startedAt;

        log.info("Data import completed. Copied to staging: {}, inserted to table: {}, took {} ms",
                copiedRows,
                finalCount == null ? 0 : finalCount,
                elapsedMs);
    }

    private long importByCopy() {
        try {
            jdbcTemplate.execute(CREATE_STAGING_TABLE_SQL);
            jdbcTemplate.execute(TRUNCATE_STAGING_TABLE_SQL);

            long copiedRows = jdbcTemplate.execute((org.springframework.jdbc.core.ConnectionCallback<Long>) connection -> {
                BaseConnection pgConnection = connection.unwrap(BaseConnection.class);
                CopyManager copyManager = new CopyManager(pgConnection);
                try (Reader reader = openCsvReader()) {
                    return copyManager.copyIn(COPY_TO_STAGING_SQL, reader);
                } catch (IOException e) {
                    throw new IllegalStateException("Failed to open CSV file: " + csvPath, e);
                }
            });

            jdbcTemplate.update(MERGE_FROM_STAGING_SQL);
            return copiedRows;
        } catch (Exception e) {
            log.error("Failed to import data by COPY: {}", e.getMessage(), e);
            return 0;
        }
    }

    private Reader openCsvReader() throws IOException {
        Resource resource = new DefaultResourceLoader().getResource(csvPath);
        return new BufferedReader(new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8));
    }
}
