package TaskRepository;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data // Generates getters, setters, toString, equals, and hashCode methods
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskName;
    private String dueDate;
    private String assignee;
    private String creator;
    private String description;
    private boolean completed;

    // Building a constructor for the Task class
    public Task() {}
}