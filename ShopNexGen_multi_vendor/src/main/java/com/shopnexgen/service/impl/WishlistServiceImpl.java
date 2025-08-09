package com.shopnexgen.service.impl;

import com.shopnexgen.exception.WishlistNotFoundException;
import com.shopnexgen.model.Product;
import com.shopnexgen.model.User;
import com.shopnexgen.model.Wishlist;
import com.shopnexgen.repository.WishlistRepository;
import com.shopnexgen.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;


    @Override
    public Wishlist createWishlist(User user) {
        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        return wishlistRepository.save(wishlist);
    }

    @Override
    public Wishlist getWishlistByUserId(User user) {
        Wishlist wishlist = wishlistRepository.findByUserId(user.getId());
        if (wishlist == null) {
            wishlist = this.createWishlist(user);
        }
        return wishlist;
    }

    @Override
    public Wishlist addProductToWishlist(User user, Product product) throws WishlistNotFoundException {
        Wishlist wishlist = this.getWishlistByUserId(user);
        
        // Check if product already exists in wishlist by ID
        boolean productExists = wishlist.getProducts().stream()
                .anyMatch(p -> p.getId().equals(product.getId()));
        
        if (productExists) {
            // Remove product if it exists
            wishlist.setProducts(wishlist.getProducts().stream()
                    .filter(p -> !p.getId().equals(product.getId()))
                    .collect(Collectors.toSet()));
        } else {
            // Add product if it doesn't exist
            wishlist.getProducts().add(product);
        }

        return wishlistRepository.save(wishlist);
    }
}

