<script lang="ts">
	import { cart, cartActions } from '$lib/stores/cartStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let dialog: HTMLDialogElement;

	// Open/close methods
	const open = () => {
		dialog.showModal();
	};

	const close = () => {
		dialog.close();
	};

	// Close on escape key
	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			close();
		}
	};

	// Close when clicking on backdrop
	const handleBackdropClick = (event: MouseEvent) => {
		const dialogDimensions = dialog.getBoundingClientRect();
		if (
			event.clientX < dialogDimensions.left ||
			event.clientX > dialogDimensions.right ||
			event.clientY < dialogDimensions.top ||
			event.clientY > dialogDimensions.bottom
		) {
			close();
		}
	};

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	// Export open method so parent can call it
	export { open };

	// Cart actions
	const updateQuantity = (productId: string, newQuantity: number) => {
		if (newQuantity < 1) return;
		cartActions.updateQuantity(productId, newQuantity);
	};

	const removeItem = (productId: string, productName: string) => {
		cartActions.removeFromCart(productId, productName);
	};

	const proceedToCheckout = () => {
		close();
		goto('/checkout');
	};
</script>

<dialog bind:this={dialog} class="cart-dialog" on:click={handleBackdropClick}>
	<div class="cart-content">
		<!-- Header -->
		<div class="cart-header">
			<h2 class="cart-title">Your Shopping Cart</h2>
			<button class="close-button" on:click={close} aria-label="Close cart">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path
						d="M18 6L6 18M6 6l12 12"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
			</button>
		</div>

		<!-- Cart Items -->
		<div class="cart-body">
			{#if $cart.items.length === 0}
				<div class="empty-cart">
					<svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="empty-icon">
						<path
							d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l-2.5 5.5m0 0h12.5"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M9 19a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
							stroke="currentColor"
							stroke-width="2"
						/>
					</svg>
					<h3>Your cart is empty</h3>
					<p>Add some products to get started</p>
					<button class="continue-shopping" on:click={close}> Continue Shopping </button>
				</div>
			{:else}
				<div class="cart-items">
					{#each $cart.items as item (item.product.name)}
						<div class="cart-item">
							<img src={item.product.image} alt={item.product.name} class="item-image" />

							<div class="item-details">
								<h4 class="item-name">{item.product.name}</h4>
								<p class="item-category">{item.product.category}</p>
								<p class="item-price">₦{item.product.price.toLocaleString()}</p>
							</div>

							<div class="quantity-controls">
								<button
									class="quantity-btn"
									on:click={() => updateQuantity(item.product.name, item.quantity - 1)}
									aria-label="Decrease quantity"
								>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
										<path
											d="M5 12h14"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
										/>
									</svg>
								</button>

								<span class="quantity-display">{item.quantity}</span>

								<button
									class="quantity-btn"
									on:click={() => updateQuantity(item.product.name, item.quantity + 1)}
									aria-label="Increase quantity"
								>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
										<path
											d="M12 5v14M5 12h14"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
										/>
									</svg>
								</button>
							</div>

							<div class="item-total">
								₦{(item.product.price * item.quantity).toLocaleString()}
							</div>

							<button
								class="remove-item"
								on:click={() => removeItem(item.product.name, item.product.name)}
								aria-label={`Remove ${item.product.name} from cart`}
							>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
									<path
										d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
									/>
								</svg>
							</button>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Footer with Total and Actions -->
		{#if $cart.items.length > 0}
			<div class="cart-footer">
				<div class="cart-summary">
					<div class="summary-row">
						<span>Subtotal ({$cart.itemCount} {$cart.itemCount === 1 ? 'item' : 'items'}):</span>
						<span class="subtotal">₦{$cart.total.toLocaleString()}</span>
					</div>
					<div class="summary-row">
						<span>Shipping:</span>
						<span class="shipping">Calculated at checkout</span>
					</div>
					<div class="summary-row total">
						<span>Total:</span>
						<span class="total-amount">₦{$cart.total.toLocaleString()}</span>
					</div>
				</div>

				<div class="cart-actions">
					<button class="clear-cart" on:click={cartActions.clearCart}> Clear Cart </button>
					<button class="checkout-btn" on:click={proceedToCheckout}> Proceed to Checkout </button>
				</div>
			</div>
		{/if}
	</div>
</dialog>

<style>
	.cart-dialog {
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		max-width: 480px;
		height: 100vh;
		margin: 0;
		padding: 0;
		border: none;
		background: white;
		box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
		animation: slideIn 0.3s ease-out;
	}

	.cart-dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
	}

	.cart-content {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	/* Header */
	.cart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24px;
		border-bottom: 1px solid #e5e5e5;
		background: white;
	}

	.cart-title {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 700;
		color: #000;
	}

	.close-button {
		background: none;
		border: none;
		padding: 8px;
		cursor: pointer;
		border-radius: 6px;
		color: #666;
		transition: all 0.2s ease;
	}

	.close-button:hover {
		background: #f5f5f5;
		color: #000;
	}

	/* Body */
	.cart-body {
		flex: 1;
		overflow-y: auto;
		padding: 0;
	}

	/* Empty Cart */
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 40px;
		text-align: center;
	}

	.empty-icon {
		color: #ccc;
		margin-bottom: 20px;
	}

	.empty-cart h3 {
		margin: 0 0 8px 0;
		font-size: 1.25rem;
		color: #333;
	}

	.empty-cart p {
		margin: 0 0 24px 0;
		color: #666;
	}

	.continue-shopping {
		background: #000;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.continue-shopping:hover {
		background: #333;
	}

	/* Cart Items */
	.cart-items {
		padding: 0;
	}

	.cart-item {
		display: grid;
		grid-template-columns: 80px 1fr auto auto;
		gap: 16px;
		align-items: center;
		padding: 20px 24px;
		border-bottom: 1px solid #f0f0f0;
		transition: background 0.2s ease;
	}

	.cart-item:hover {
		background: #fafafa;
	}

	.item-image {
		width: 80px;
		height: 80px;
		object-fit: cover;
		border-radius: 8px;
	}

	.item-details {
		min-width: 0;
	}

	.item-name {
		margin: 0 0 4px 0;
		font-size: 0.95rem;
		font-weight: 600;
		color: #000;
		line-height: 1.3;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.item-category {
		margin: 0 0 6px 0;
		font-size: 0.8rem;
		color: #999;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.item-price {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 600;
		color: #000;
	}

	.quantity-controls {
		display: flex;
		align-items: center;
		gap: 12px;
		background: #f8f8f8;
		border-radius: 8px;
		padding: 6px;
	}

	.quantity-btn {
		background: white;
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		color: #333;
	}

	.quantity-btn:hover {
		background: #000;
		color: white;
		border-color: #000;
	}

	.quantity-display {
		min-width: 20px;
		text-align: center;
		font-weight: 600;
		font-size: 0.9rem;
		color: #000;
	}

	.item-total {
		font-weight: 700;
		font-size: 1rem;
		color: #000;
		min-width: 80px;
		text-align: right;
	}

	.remove-item {
		background: none;
		border: none;
		padding: 8px;
		cursor: pointer;
		border-radius: 6px;
		color: #999;
		transition: all 0.2s ease;
	}

	.remove-item:hover {
		background: #fef2f2;
		color: #dc2626;
	}

	/* Footer */
	.cart-footer {
		border-top: 1px solid #e5e5e5;
		padding: 24px;
		background: white;
	}

	.cart-summary {
		margin-bottom: 20px;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
		font-size: 0.9rem;
	}

	.summary-row.total {
		border-top: 1px solid #e5e5e5;
		padding-top: 12px;
		margin-top: 12px;
		font-weight: 700;
		font-size: 1.1rem;
	}

	.subtotal,
	.total-amount {
		font-weight: 600;
		color: #000;
	}

	.shipping {
		color: #666;
		font-style: italic;
	}

	.cart-actions {
		display: flex;
		gap: 12px;
	}

	.clear-cart {
		flex: 1;
		background: none;
		border: 1px solid #ddd;
		padding: 14px;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		color: #666;
	}

	.clear-cart:hover {
		background: #f5f5f5;
		border-color: #ccc;
		color: #000;
	}

	.checkout-btn {
		flex: 2;
		background: #000;
		color: white;
		border: none;
		padding: 14px;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.checkout-btn:hover {
		background: #333;
	}

	/* Animations */
	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	/* Responsive Design */
	@media (max-width: 480px) {
		.cart-dialog {
			max-width: 100%;
		}

		.cart-header {
			padding: 20px;
		}

		.cart-item {
			grid-template-columns: 60px 1fr auto;
			gap: 12px;
			padding: 16px 20px;
		}

		.item-image {
			width: 60px;
			height: 60px;
		}

		.item-total {
			grid-column: 1 / -1;
			text-align: left;
			margin-top: 8px;
			padding-left: 72px;
		}

		.cart-footer {
			padding: 20px;
		}

		.cart-actions {
			flex-direction: column;
		}
	}
</style>
