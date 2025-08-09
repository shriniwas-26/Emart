package com.shopnexgen.repository;

import com.shopnexgen.model.Payouts;
import com.shopnexgen.model.enums.PayoutsStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PayoutsRepository extends JpaRepository<Payouts,Long> {
    List<Payouts> findPayoutsBySellerId(Long sellerId);
    List<Payouts> findAllByStatus(PayoutsStatus status);
}

