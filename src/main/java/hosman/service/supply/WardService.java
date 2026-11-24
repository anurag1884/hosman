/* (C)2026 */
package hosman.service.supply;

import hosman.entity.supply.Ward;
import hosman.repo.supply.WardRepository;
import org.springframework.stereotype.Service;

@Service
public class WardService {

    private final WardRepository repo;

    public WardService(WardRepository repo) {

        this.repo = repo;
    }

    public Ward get(Long id) {

        return repo.findById(id).get();
    }

    public Ward save(Ward Ward) {

        return repo.save(Ward);
    }

    public void delete(Ward Ward) {

        repo.delete(Ward);
    }
}
