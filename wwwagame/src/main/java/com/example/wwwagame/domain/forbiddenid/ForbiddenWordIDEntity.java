package com.example.wwwagame.domain.forbiddenid;

import com.example.wwwagame.domain.forbidden.ForbiddenWordDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "forbidden_word_id")
@Entity
@NoArgsConstructor
@Getter
@ToString
public class ForbiddenWordIDEntity {
    @Id
    private String word;

    public ForbiddenWordIDDto toWordIDDto(ForbiddenWordIDEntity entity) {
        return new ForbiddenWordIDDto(entity.getWord());
    }
}
