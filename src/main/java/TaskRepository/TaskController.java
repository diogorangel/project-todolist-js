package TaskRepository; // O nome da pasta onde o arquivo está

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

// Imports others class
import TaskRepository.Task;
import TaskRepository.TaskRepository;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskRepository repository;

    // READ: Results
    @GetMapping
    public List<Task> getTasks() {
        return repository.findAll();
    }

    // CREATE:Requirements
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return repository.save(task);
    }

    // DELETE: Logic Confirmation and Deletion
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        repository.deleteById(id);
    }
}