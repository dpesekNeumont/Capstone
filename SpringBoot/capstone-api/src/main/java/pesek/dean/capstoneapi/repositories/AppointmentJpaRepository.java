package pesek.dean.capstoneapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pesek.dean.capstoneapi.models.Appointment;

public interface AppointmentJpaRepository extends JpaRepository<Appointment, Integer>{

}
