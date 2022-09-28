package ua.lviv.iot.newpost_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.lviv.iot.newpost_backend.models.Boxes;
import ua.lviv.iot.newpost_backend.services.NewPostService;
import java.util.List;

@RestController
@RequestMapping("api/boxes")

public class NewPostController {
    private final NewPostService newPostService;

    @Autowired
    public NewPostController(NewPostService newPostService) {
        this.newPostService = newPostService;
    }

    @CrossOrigin
    @GetMapping("/get")
    private List<Boxes> getAll() {
        return newPostService.getAll();
    }

    @CrossOrigin
    @GetMapping("get/{id}")
    private Boxes getOne(@PathVariable("id") Integer id){
        return newPostService.getOne(id);
    }

    @CrossOrigin
    @PostMapping
    public void create(@RequestBody Boxes boxes) {
        newPostService.create(boxes);
    }

    @CrossOrigin
    @PutMapping("/update/{id}")
    private void update(@PathVariable("id") Integer id, @RequestBody Boxes boxes) {
        newPostService.update(id, boxes);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    private void delete(@PathVariable("id") Integer id) {
        newPostService.delete(id);
    }
}
