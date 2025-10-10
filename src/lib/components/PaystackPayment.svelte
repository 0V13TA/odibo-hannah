<script lang="ts">
	import { cart, cartActions } from '$lib/stores/cartStore';
	import { onMount } from 'svelte';

	export let customerEmail = '';

	// Get this from your Paystack dashboard
	const PAYSTACK_PUBLIC_KEY = 'pk_test_your_public_key_here';

	let isProcessing = false;
	let paymentError = '';
	let paystackLoaded = false;

	// Load Paystack script
	onMount(() => {
		if ((window as any).PaystackPop) {
			paystackLoaded = true;
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://js.paystack.co/v1/inline.js';
		script.onload = () => {
			paystackLoaded = true;
			console.log('Paystack script loaded successfully');
		};
		script.onerror = () => {
			paymentError = 'Failed to load payment processor. Please refresh the page.';
		};
		document.head.appendChild(script);
	});

	const initializePayment = async () => {
		if (isProcessing) return;

		// Validation
		if (!customerEmail) {
			paymentError = 'Please enter your email address for payment receipt';
			return;
		}

		if (!paystackLoaded) {
			paymentError = 'Payment system is still loading. Please wait a moment.';
			return;
		}

		if ($cart.total <= 0) {
			paymentError = 'Your cart is empty';
			return;
		}

		isProcessing = true;
		paymentError = '';

		try {
			// Convert to kobo (subunits)
			const amountInKobo = Math.round($cart.total * 100);

			// Generate unique reference
			const reference = 'EMB_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

			// Initialize Paystack
			const handler = (window as any).PaystackPop.setup({
				key: PAYSTACK_PUBLIC_KEY,
				email: customerEmail,
				amount: amountInKobo,
				currency: 'NGN',
				ref: reference,
				metadata: {
					custom_fields: [
						{
							display_name: 'Cart Items',
							variable_name: 'cart_items',
							value: $cart.items
								.map((item) => `${item.product.name} (x${item.quantity})`)
								.join(', ')
						}
					]
				},
				callback: function (response: any) {
					// Payment successful
					console.log('Payment successful!', response);
					handleSuccessfulPayment(response);
				},
				onClose: function () {
					// User closed the payment modal
					console.log('Payment window closed by user');
					isProcessing = false;
				}
			});

			handler.openIframe();
		} catch (error) {
			console.error('Payment initialization error:', error);
			paymentError = 'Failed to initialize payment. Please try again.';
			isProcessing = false;
		}
	};

	const handleSuccessfulPayment = (response: any) => {
		// Show success message
		alert(
			`🎉 Payment Successful!\n\nReference: ${response.reference}\nAmount: ₦${$cart.total.toLocaleString()}\n\nThank you for your purchase!`
		);

		// Clear the cart
		cartActions.clearCart();

		// Reset form
		isProcessing = false;

		// Optional: Redirect to success page or close cart
		// window.location.href = '/order-success?reference=' + response.reference;
	};
</script>

<div class="payment-section">
	{#if paymentError}
		<div class="error-message" role="alert">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="error-icon">
				<path
					d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
					stroke="currentColor"
					stroke-width="2"
				/>
				<path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
			{paymentError}
		</div>
	{/if}

	<button
		class="paystack-button"
		on:click={initializePayment}
		disabled={isProcessing || $cart.total === 0 || !customerEmail}
		aria-label={isProcessing
			? 'Processing payment...'
			: `Pay ₦${$cart.total.toLocaleString()} with Paystack`}
	>
		{#if isProcessing}
			<span class="spinner"></span>
			Processing Payment...
		{:else}
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="lock-icon">
				<path
					d="M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z"
					stroke="currentColor"
					stroke-width="2"
				/>
				<path
					d="M7 11V7a5 5 0 0110 0v4"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
			Pay ₦{$cart.total.toLocaleString()}
		{/if}
	</button>

	<div class="payment-security">
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="shield-icon">
			<path
				d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
				stroke="currentColor"
				stroke-width="2"
			/>
		</svg>
		<span>Secure payment powered by Paystack</span>
	</div>
</div>

<style>
	.payment-section {
		width: 100%;
	}

	.paystack-button {
		background: linear-gradient(135deg, #00a859 0%, #008f4a 100%);
		color: white;
		border: none;
		padding: 16px 24px;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		box-shadow: 0 4px 12px rgba(0, 168, 89, 0.3);
	}

	.paystack-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 168, 89, 0.4);
	}

	.paystack-button:active:not(:disabled) {
		transform: translateY(0);
	}

	.paystack-button:disabled {
		background: #ccc;
		box-shadow: none;
		transform: none;
		cursor: not-allowed;
	}

	.spinner {
		width: 20px;
		height: 20px;
		border: 2px solid transparent;
		border-top: 2px solid currentColor;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	.lock-icon,
	.shield-icon {
		flex-shrink: 0;
	}

	.error-message {
		background: #fef2f2;
		border: 1px solid #fecaca;
		color: #dc2626;
		padding: 12px 16px;
		border-radius: 6px;
		margin-bottom: 16px;
		font-size: 0.9rem;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.error-icon {
		flex-shrink: 0;
	}

	.payment-security {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-top: 12px;
		color: #666;
		font-size: 0.8rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Responsive */
	@media (max-width: 480px) {
		.paystack-button {
			padding: 14px 20px;
			font-size: 0.9rem;
		}
	}
</style>
