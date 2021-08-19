package com.example.demosecurity.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class Statistical {
    private Integer totalProduct;
    private Integer totalOrder;
    private Float Totalmoney;
    private Float TotalmoneyCancle;
    private Integer statusAccept;
    private Integer statusGetProduct;
    private Integer statusDelivery;
    private Integer statusSucces;
    private Integer statusCancel;
    private String curnentTime;
    private String periodTime;
}
