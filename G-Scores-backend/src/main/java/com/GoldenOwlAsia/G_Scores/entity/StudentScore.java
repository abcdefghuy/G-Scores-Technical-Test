package com.GoldenOwlAsia.G_Scores.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "student_scores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentScore {

    @Id
    @Column(name = "sbd", length = 20)
    private String sbd;

    @Column(name = "toan")
    private Double toan;

    @Column(name = "ngu_van")
    private Double nguVan;

    @Column(name = "ngoai_ngu")
    private Double ngoaiNgu;

    @Column(name = "vat_li")
    private Double vatLi;

    @Column(name = "hoa_hoc")
    private Double hoaHoc;

    @Column(name = "sinh_hoc")
    private Double sinhHoc;

    @Column(name = "lich_su")
    private Double lichSu;

    @Column(name = "dia_li")
    private Double diaLi;

    @Column(name = "gdcd")
    private Double gdcd;

    @Column(name = "ma_ngoai_ngu", length = 10)
    private String maNgoaiNgu;
}
