package pesek.dean.capstoneapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import pesek.dean.capstoneapi.models.Address;

public interface AddressJpaRepository extends JpaRepository<Address, Integer> {

}
