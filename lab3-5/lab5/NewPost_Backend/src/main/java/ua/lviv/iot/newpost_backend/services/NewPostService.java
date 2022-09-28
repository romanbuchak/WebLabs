package ua.lviv.iot.newpost_backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ua.lviv.iot.newpost_backend.models.Boxes;
import ua.lviv.iot.newpost_backend.repositories.NewPostRepositories;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class NewPostService {
    private final NewPostRepositories newPostRepositories;

    @Autowired
    public NewPostService(NewPostRepositories newPostRepositories) {
        this.newPostRepositories = newPostRepositories;
    }

    public List<Boxes> getAll() {
        return newPostRepositories.findAll();
    }

    public Boxes getOne(Integer id) {
        return newPostRepositories.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void create(Boxes boxes) {
        newPostRepositories.save(boxes);
    }

    @Transactional
    public void update(Integer id, Boxes boxes) {
        Boxes newBoxes = newPostRepositories.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        newBoxes.setName(boxes.getName());
        newBoxes.setPrice(boxes.getPrice());
        newBoxes.setSize(boxes.getSize());
    }

    public void delete(Integer id) {
        newPostRepositories.deleteById(id);
    }
}
