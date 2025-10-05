<script lang="ts">
	import type { Product } from '$lib/types';
	import productsData from '$lib/products.json';

	const products: Product[] = productsData;

</script>

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
