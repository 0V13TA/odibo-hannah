<script lang="ts">
	import type { Product } from '$lib/types';
	import productsData from '$lib/products.json';

	const products: Product[] = [
		productsData[0],
		productsData[1],
		productsData[5],
		productsData[4],
		productsData[3],
		productsData[2]
	];
</script>

<div class="cont">
	<h1>Some Of Our Products</h1>
	<div class="products-grid">
		{#each products as product (product.name)}
			<div class="product-card">
				<img src={product.image} alt={product.name} />
				<h3>{product.name}</h3>
				<p class="category">{product.category}</p>
				<p class="price">₦{product.price.toLocaleString()}</p>
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
	}

	h1 {
		margin: 20px auto;
		font-weight: bold;
		font-size: larger;
		text-align: center;
		text-transform: uppercase;
	}

	.products-grid {
		gap: 30px;
		display: flex;
		flex-wrap: wrap;
		margin-top: 30px;
		align-items: center;
		justify-content: center;
	}

	.product-card img {
		width: 30dvw;
		height: auto;
	}

	.product-card {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.products-grid h3 {
		color: #333333;
		font-weight: bold;
		text-transform: uppercase;
	}

	.products-grid .category {
		color: #a3a3a3;
	}
</style>
