package com.example.wwwagame.domain.forbidden;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "forbidden_word")
@Entity
@NoArgsConstructor
@Getter
@ToString
public class ForbiddenWordEntity {
    @Id
    private String word;

    public ForbiddenWordDto toWordDto(ForbiddenWordEntity entity) {
        return new ForbiddenWordDto(entity.getWord());
    }
}
