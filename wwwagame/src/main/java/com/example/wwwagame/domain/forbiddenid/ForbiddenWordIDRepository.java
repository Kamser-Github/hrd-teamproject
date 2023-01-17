package com.example.wwwagame.domain.forbiddenid;

import com.example.wwwagame.domain.forbidden.ForbiddenWordEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForbiddenWordIDRepository extends JpaRepository<ForbiddenWordIDEntity,String> {

}
