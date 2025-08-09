import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { getWishlistByUserId } from '../../../Redux Toolkit/Customer/WishlistSlice';
import WishlistProductCard from './WishlistProductCard';

const Wishlist = () => {
    const dispatch = useAppDispatch();
    const { wishlist, auth } = useAppSelector(store => store);

    useEffect(() => {
        // Fetch wishlist when component mounts
        console.log("Wishlist component mounted, dispatching getWishlistByUserId");
        console.log("Auth state:", auth);
        console.log("JWT from localStorage:", localStorage.getItem("jwt"));
        dispatch(getWishlistByUserId());
    }, [dispatch]);

    console.log("wishlist state:", wishlist);
    console.log("wishlist.wishlist:", wishlist.wishlist);
    console.log("wishlist.wishlist?.products:", wishlist.wishlist?.products);
    
    return (
        <div className='h-[85vh] p-5 lg:p-20'>
            {wishlist.loading ? (
                <div className="h-full flex justify-center items-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading wishlist...</p>
                    </div>
                </div>
            ) : wishlist.error ? (
                <div className="h-full flex justify-center items-center">
                    <div className="text-center">
                        <p className="text-red-500">Error: {wishlist.error}</p>
                        <button 
                            onClick={() => dispatch(getWishlistByUserId())}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            ) : wishlist.wishlist?.products?.length ? (
                <section>
                    <h1><strong>My Wishlist</strong> {wishlist.wishlist.products.length} items</h1>
                    <div className='pt-10 flex flex-wrap gap-5'>
                        {wishlist.wishlist?.products?.map((item, index) => (
                            <WishlistProductCard key={index} item={item} />
                        ))}
                    </div>
                </section>
            ) : (
                <div className="h-full flex justify-center items-center flex-col">
                    <div className="text-center py-5">
                        <h1 className="text-lg font-medium">Hey, it feels so light!</h1>
                        <p className="text-gray-500 text-sm">
                            There is nothing in your wishlist, let's add some items.
                        </p>
                        <div className="mt-4 text-xs text-gray-400">
                            <p>Debug Info:</p>
                            <p>Loading: {wishlist.loading ? 'true' : 'false'}</p>
                            <p>Error: {wishlist.error || 'none'}</p>
                            <p>Wishlist exists: {wishlist.wishlist ? 'true' : 'false'}</p>
                            <p>Products count: {wishlist.wishlist?.products?.length || 0}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
