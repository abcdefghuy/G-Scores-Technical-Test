package com.GoldenOwlAsia.G_Scores.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.GoldenOwlAsia.G_Scores.dto.res.SubjectLevelCounts;
import com.GoldenOwlAsia.G_Scores.dto.res.Top10StudentResponse;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class NativeQueryRepository {

    private final JdbcTemplate jdbcTemplate;

    private static final Set<String> ALLOWED_COLUMNS = Set.of(
            "toan", "ngu_van", "ngoai_ngu", "vat_li",
            "hoa_hoc", "sinh_hoc", "lich_su", "dia_li", "gdcd"
    );

    public SubjectLevelCounts countScoreLevelsBySubject(String columnName) {
        validateColumnName(columnName);
        String sql = buildCountByLevelSql(columnName);
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> new SubjectLevelCounts(
                rs.getLong("excellent"),
                rs.getLong("good"),
                rs.getLong("average"),
                rs.getLong("weak")
        ));
    }

    public Map<String, SubjectLevelCounts> countScoreLevelsForAllSubjects() {
        String sql = buildCountAllLevelsSql();
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            Map<String, SubjectLevelCounts> results = new LinkedHashMap<>();
            for (String col : ALLOWED_COLUMNS) {
                results.put(col, new SubjectLevelCounts(
                        rs.getLong(col + "_excellent"),
                        rs.getLong(col + "_good"),
                        rs.getLong(col + "_average"),
                        rs.getLong(col + "_weak")
                ));
            }
            return results;
        });
    }

    public List<Top10StudentResponse> findTop10ByGroup(List<String> columns) {
        columns.forEach(this::validateColumnName);
        String sql = buildTop10Sql(columns);
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Map<String, Double> scores = new LinkedHashMap<>();
            for (String col : columns) {
                double value = rs.getDouble(col);
                scores.put(col, rs.wasNull() ? null : value);
            }
            return new Top10StudentResponse(
                    rowNum + 1,
                    rs.getString("sbd"),
                    scores,
                    rs.getDouble("group_total")
            );
        });
    }

    private void validateColumnName(String columnName) {
        if (!ALLOWED_COLUMNS.contains(columnName)) {
            throw new IllegalArgumentException("Invalid column name: " + columnName);
        }
    }

    private String buildCountByLevelSql(String col) {
        return String.format(
                "SELECT " +
                "COUNT(CASE WHEN %s >= 8 THEN 1 END) AS excellent, " +
                "COUNT(CASE WHEN %s >= 6 AND %s < 8 THEN 1 END) AS good, " +
                "COUNT(CASE WHEN %s >= 4 AND %s < 6 THEN 1 END) AS average, " +
                "COUNT(CASE WHEN %s < 4 THEN 1 END) AS weak " +
                "FROM student_scores WHERE %s IS NOT NULL",
                col, col, col, col, col, col, col
        );
    }

    private String buildCountAllLevelsSql() {
        StringBuilder sql = new StringBuilder("SELECT ");
        List<String> columns = List.copyOf(ALLOWED_COLUMNS);
        for (int i = 0; i < columns.size(); i++) {
            String col = columns.get(i);
            sql.append(String.format("COUNT(CASE WHEN %s >= 8 THEN 1 END) AS %s_excellent, ", col, col));
            sql.append(String.format("COUNT(CASE WHEN %s >= 6 AND %s < 8 THEN 1 END) AS %s_good, ", col, col, col));
            sql.append(String.format("COUNT(CASE WHEN %s >= 4 AND %s < 6 THEN 1 END) AS %s_average, ", col, col, col));
            sql.append(String.format("COUNT(CASE WHEN %s < 4 AND %s IS NOT NULL THEN 1 END) AS %s_weak", col, col, col));
            if (i < columns.size() - 1) {
                sql.append(", ");
            }
        }
        sql.append(" FROM student_scores");
        return sql.toString();
    }

    private String buildTop10Sql(List<String> columns) {
        String sumExpression = String.join(" + ", columns);
        String selectedColumns = String.join(", ", columns);
        String notNullConditions = columns.stream()
                .map(col -> col + " IS NOT NULL")
                .collect(Collectors.joining(" AND "));

        return String.format(
                "SELECT sbd, %s, (%s) AS group_total " +
                "FROM student_scores " +
                "WHERE %s " +
                "ORDER BY group_total DESC " +
                "LIMIT 10",
                selectedColumns, sumExpression, notNullConditions
        );
    }
}
