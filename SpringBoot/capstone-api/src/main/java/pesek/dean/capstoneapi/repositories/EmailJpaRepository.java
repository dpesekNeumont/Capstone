package pesek.dean.capstoneapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import pesek.dean.capstoneapi.models.Address;
import pesek.dean.capstoneapi.models.Email;

public interface EmailJpaRepository extends JpaRepository<Email, Integer>{

}
