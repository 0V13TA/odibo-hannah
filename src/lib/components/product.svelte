<script lang="ts">
	import type { Product } from '$lib/types';
	import productsData from '$lib/products.json';
	import { cartActions } from '$lib/stores/cartStore';

	const products: Product[] = [productsData[0]];
	let addingProductId: string | null = null;

	const handleAddToCart = async (product: Product) => {
		addingProductId = product.name;

		try {
			// This will automatically save to cookies via the cart store
			cartActions.addToCart(product, 1);

			// Optional: Add a small delay for better UX
			await new Promise((resolve) => setTimeout(resolve, 500));
		} catch (error) {
			console.error('Error adding to cart:', error);
		} finally {
			addingProductId = null;
		}
	};
</script>

<div class="cont">
	<h1>Our Quality Products</h1>
	<div class="products-grid">
		{#each products as product (product.name)}
			<div class="product-card">
				<img src={product.image} alt={product.name} />
				<h3>{product.name}</h3>
				<p class="category">{product.category}</p>
				<p class="price">₦{product.price.toLocaleString()}</p>
				<button
					class="add-to-cart-btn"
					on:click={() => handleAddToCart(product)}
					disabled={addingProductId === product.name}
					class:loading={addingProductId === product.name}
				>
					{#if addingProductId === product.name}
						<span class="spinner"></span>
						Adding...
					{:else}
						Add To Cart
					{/if}
				</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.cont {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		padding: 40px 20px;
	}

	h1 {
		margin: 20px auto;
		font-weight: bold;
		font-size: 2rem;
		text-align: center;
		text-transform: uppercase;
		color: #333;
	}

	.products-grid {
		gap: 30px;
		display: flex;
		flex-wrap: wrap;
		margin-top: 30px;
		align-items: center;
		justify-content: center;
		max-width: 1200px;
	}

	.product-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: white;
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.product-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}

	.product-card img {
		width: 250px;
		height: 250px;
		object-fit: cover;
		border-radius: 8px;
		margin-bottom: 15px;
	}

	.products-grid h3 {
		color: #333333;
		font-weight: bold;
		text-transform: uppercase;
		font-size: 1.1rem;
		margin: 10px 0 5px 0;
		text-align: center;
	}

	.products-grid .category {
		color: #a3a3a3;
		font-size: 0.9rem;
		margin: 0 0 10px 0;
	}

	.products-grid .price {
		color: #000;
		font-weight: bold;
		font-size: 1.2rem;
		margin: 0 0 15px 0;
	}

	.add-to-cart-btn {
		background: #000;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.9rem;
	}

	.add-to-cart-btn:hover:not(:disabled) {
		background: #333;
		transform: translateY(-2px);
	}

	.add-to-cart-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	.add-to-cart-btn.loading {
		background: #666;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid transparent;
		border-top: 2px solid currentColor;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.cont {
			padding: 20px 15px;
		}

		h1 {
			font-size: 1.5rem;
		}

		.products-grid {
			gap: 20px;
		}

		.product-card img {
			width: 200px;
			height: 200px;
		}

		.product-card {
			padding: 15px;
		}
	}

	@media (max-width: 480px) {
		.products-grid {
			flex-direction: column;
		}

		.product-card {
			width: 100%;
			max-width: 300px;
		}

		.product-card img {
			width: 100%;
			height: 250px;
		}
	}
</style>
