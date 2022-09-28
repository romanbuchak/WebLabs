package ua.lviv.iot.newpost_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.lviv.iot.newpost_backend.models.Boxes;

@Repository
public interface NewPostRepositories extends JpaRepository<Boxes, Integer> {

}
