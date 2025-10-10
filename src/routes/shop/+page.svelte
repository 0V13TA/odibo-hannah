<script lang="ts">
	import type { Product } from '$lib/types';
	import { onMount } from 'svelte';
	import productsData from '$lib/products.json';
	import { cartActions } from '$lib/stores/cartStore';

	// Product data
	const products: Product[] = productsData;
	let productDisplay: Product[] = products;
	let showingCategories = false;

	// Toggle category dropdown
	const toggleCategories = () => (showingCategories = !showingCategories);

	// Close dropdown when clicking outside
	let categoriesDropdown: HTMLElement;
	let categoriesButton: HTMLElement;

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				showingCategories &&
				categoriesDropdown &&
				!categoriesDropdown.contains(event.target as Node) &&
				categoriesButton &&
				!categoriesButton.contains(event.target as Node)
			) {
				showingCategories = false;
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	// Category data
	type Category = {
		id: string;
		label: string;
		value: Product[];
	};

	const categories: Category[] = [
		{ id: 'all', label: 'All Products', value: products },
		{ id: 'art', label: 'Art', value: products.filter((p) => p.category === 'Art') },
		{ id: 'food', label: 'Food', value: products.filter((p) => p.category === 'Food') },
		{ id: 'beauty', label: 'Beauty', value: products.filter((p) => p.category === 'Beauty') },
		{ id: 'garden', label: 'Garden', value: products.filter((p) => p.category === 'Garden') },
		{ id: 'fashion', label: 'Fashion', value: products.filter((p) => p.category === 'Fashion') },
		{ id: 'jewelry', label: 'Jewelry', value: products.filter((p) => p.category === 'Jewelry') },
		{
			id: 'beverage',
			label: 'Beverages',
			value: products.filter((p) => p.category === 'Beverages')
		},
		{
			id: 'home_decor',
			label: 'Home Decor',
			value: products.filter((p) => p.category === 'Home Decor')
		},
		{
			id: 'home_kitchen',
			label: 'Home & Kitchen',
			value: products.filter((p) => p.category === 'Home & Kitchen')
		}
	];

	// Filter products by category
	const filterByCategory = (category: Category) => {
		productDisplay = category.value;
		showingCategories = false;
	};

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

<div class="shop">
	<!-- Header Section -->
	<header class="shop-header">
		<div class="container">
			<h1 class="shop-title">Shop</h1>
			<div class="categories-dropdown" bind:this={categoriesDropdown}>
				<button
					class="categories-toggle"
					on:click={toggleCategories}
					bind:this={categoriesButton}
					aria-expanded={showingCategories}
				>
					Categories
					<span class="dropdown-icon {showingCategories ? 'rotated' : ''}">
						<img src="/downArrow.svg" alt="" height="15" width="15" />
					</span>
				</button>

				<div class="dropdown-menu {showingCategories ? 'show' : ''}">
					<ul class="category-list">
						{#each categories as category (category.id)}
							<li class="category-item">
								<button
									class="category-button {productDisplay === category.value ? 'active' : ''}"
									on:click={() => filterByCategory(category)}
								>
									<span class="category-name">{category.label}</span>
									<span class="product-count">{category.value.length} Product(s)</span>
								</button>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</header>

	<!-- Breadcrumb and Info -->
	<div class="shop-info container">
		<nav class="breadcrumb" aria-label="Breadcrumb">
			<a href="/" class="breadcrumb-link">Home</a>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-current">Shop</span>
		</nav>

		<p class="results-count">Showing {productDisplay.length} product(s)</p>
	</div>

	<!-- Products Grid -->
	<div class="products-grid container">
		{#if productDisplay.length > 0}
			{#each productDisplay as product (product.name)}
				<article class="product-card">
					<div class="product-image">
						<img src={product.image} alt={product.name} loading="lazy" />
						<button
							class="add-to-cart-btn"
							on:click={() => handleAddToCart(product)}
							aria-label={`Add ${product.name} to cart`}
							disabled={addingProductId === product.name}
							class:loading={addingProductId === product.name}
						>
							Add To Cart
						</button>
					</div>

					<div class="product-info">
						<h3 class="product-name">{product.name}</h3>
						<p class="product-category">{product.category}</p>
						<p class="product-price">₦{product.price.toLocaleString()}</p>
					</div>
				</article>
			{/each}
		{:else}
			<div class="no-products">
				<p>No products found in this category.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	.container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.shop {
		min-height: 100vh;
		padding-bottom: 40px;
	}

	/* Header Styles */
	.shop-header {
		background-color: #000;
		color: #fff;
		padding: 30px 0;
		position: relative;
	}

	.shop-title {
		font-size: 2.5rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 20px;
	}

	.categories-dropdown {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.categories-toggle {
		display: flex;
		align-items: center;
		gap: 8px;
		background: transparent;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 4px;
		padding: 10px 16px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.categories-toggle:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.dropdown-icon {
		display: flex;
		transition: transform 0.3s ease;
	}

	.dropdown-icon.rotated {
		transform: rotate(180deg);
	}

	/* Dropdown Menu */
	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		width: 280px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease;
		z-index: 100;
		margin-top: 10px;
	}

	.dropdown-menu.show {
		opacity: 1;
		visibility: visible;
	}

	.category-list {
		list-style: none;
		padding: 10px 0;
	}

	.category-item {
		border-bottom: 1px solid #f0f0f0;
	}

	.category-item:last-child {
		border-bottom: none;
	}

	.category-button {
		width: 100%;
		text-align: left;
		padding: 12px 20px;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: background 0.2s ease;
		display: flex;
		flex-direction: column;
	}

	.category-button:hover {
		background: #f8f8f8;
	}

	.category-button.active {
		background: #f0f0f0;
	}

	.category-name {
		font-weight: 600;
		font-size: 0.95rem;
		text-transform: capitalize;
		margin-bottom: 4px;
	}

	.product-count {
		font-size: 0.8rem;
		color: #666;
	}

	/* Info Section */
	.shop-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;
		border-bottom: 1px solid #eee;
		margin-bottom: 30px;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.9rem;
	}

	.breadcrumb-link {
		color: #666;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.breadcrumb-link:hover {
		color: #000;
	}

	.breadcrumb-separator {
		color: #999;
	}

	.breadcrumb-current {
		color: #000;
		font-weight: 500;
	}

	.results-count {
		color: #666;
		font-size: 0.9rem;
	}

	/* Products Grid */
	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 30px;
	}

	/* Product Card */
	.product-card {
		border-radius: 8px;
		overflow: hidden;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		background: white;
	}

	.product-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	}

	.product-image {
		position: relative;
		overflow: hidden;
	}

	.product-image img {
		width: 100%;
		height: 280px;
		object-fit: cover;
		display: block;
		transition: transform 0.5s ease;
	}

	.product-card:hover .product-image img {
		transform: scale(1.05);
	}

	.add-to-cart-btn {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: white;
		color: #000;
		border: none;
		border-radius: 50px;
		padding: 10px 20px;
		font-weight: 600;
		font-size: 0.85rem;
		cursor: pointer;
		opacity: 0;
		transition: all 0.3s ease;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
	}

	.product-card:hover .add-to-cart-btn {
		opacity: 1;
	}

	.add-to-cart-btn:hover {
		background: #000;
		color: white;
	}

	.product-info {
		padding: 20px;
	}

	.product-name {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 8px;
		color: #333;
		text-transform: uppercase;
	}

	.product-category {
		color: #999;
		font-size: 0.9rem;
		margin-bottom: 8px;
	}

	.product-price {
		font-weight: 700;
		font-size: 1.1rem;
		color: #000;
	}

	/* No Products State */
	.no-products {
		grid-column: 1 / -1;
		text-align: center;
		padding: 60px 20px;
		color: #666;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.shop-title {
			font-size: 2rem;
		}

		.shop-info {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
		}

		.products-grid {
			grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
			gap: 20px;
		}

		.dropdown-menu {
			width: 90vw;
			max-width: 280px;
		}
	}

	@media (max-width: 480px) {
		.products-grid {
			grid-template-columns: 1fr;
		}

		.container {
			padding: 0 15px;
		}
	}
</style>
