<script lang="ts">
	import { cart, cartActions } from '$lib/stores/cartStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';

	// Get Paystack key from environment variables
	const PAYSTACK_PUBLIC_KEY = env.PUBLIC_PAYSTACK_TEST_KEY;

	// Redirect if cart is empty
	onMount(() => {
		if ($cart.items.length === 0) {
			goto('/shop');
		}
		// Pre-load Paystack script when page loads
		loadPaystackScript();
	});

	// Customer form data
	let formData = {
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		address: '',
		city: '',
		state: '',
		country: 'Nigeria',
		postalCode: ''
	};

	let isProcessing = false;
	let formErrors: Record<string, string> = {};
	let paystackLoaded = false;
	let paystackLoading = false;
	let paymentError = '';

	// Nigerian states for dropdown
	const nigerianStates = [
		'Abia',
		'Adamawa',
		'Akwa Ibom',
		'Anambra',
		'Bauchi',
		'Bayelsa',
		'Benue',
		'Borno',
		'Cross River',
		'Delta',
		'Ebonyi',
		'Edo',
		'Ekiti',
		'Enugu',
		'Gombe',
		'Imo',
		'Jigawa',
		'Kaduna',
		'Kano',
		'Katsina',
		'Kebbi',
		'Kogi',
		'Kwara',
		'Lagos',
		'Nasarawa',
		'Niger',
		'Ogun',
		'Ondo',
		'Osun',
		'Oyo',
		'Plateau',
		'Rivers',
		'Sokoto',
		'Taraba',
		'Yobe',
		'Zamfara',
		'FCT'
	];

	// Validate API key format
	const validateApiKey = () => {
		if (!PAYSTACK_PUBLIC_KEY) {
			return 'Paystack public key is missing. Please check your environment variables.';
		}

		if (
			!PAYSTACK_PUBLIC_KEY.startsWith('pk_test_') &&
			!PAYSTACK_PUBLIC_KEY.startsWith('pk_live_')
		) {
      console.log(PAYSTACK_PUBLIC_KEY);
			return 'Invalid Paystack public key format. Should start with pk_test_ or pk_live_';
		}

		if (
			PAYSTACK_PUBLIC_KEY.includes('your_actual_test_key') ||
			PAYSTACK_PUBLIC_KEY.includes('replace_with')
		) {
			return 'Please update your .env file with your actual Paystack public key';
		}

		return null;
	};

	// Load Paystack script with proper error handling
	const loadPaystackScript = async (): Promise<boolean> => {
		if (paystackLoaded) return true;
		if (paystackLoading) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return paystackLoaded;
		}

		paystackLoading = true;

		return new Promise((resolve) => {
			if ((window as any).PaystackPop) {
				paystackLoaded = true;
				paystackLoading = false;
				resolve(true);
				return;
			}

			const script = document.createElement('script');
			script.src = 'https://js.paystack.co/v1/inline.js';

			script.onload = () => {
				paystackLoaded = true;
				paystackLoading = false;
				resolve(true);
			};

			script.onerror = () => {
				paystackLoading = false;
				console.error('❌ Failed to load Paystack script');
				resolve(false);
			};

			document.head.appendChild(script);

			// Fallback timeout
			setTimeout(() => {
				if (!paystackLoaded) {
					paystackLoading = false;
					console.error('⏰ Paystack script loading timeout');
					resolve(false);
				}
			}, 10000);
		});
	};

	const validateForm = () => {
		const errors: Record<string, string> = {};

		if (!formData.email) errors.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
			errors.email = 'Invalid email format';

		if (!formData.firstName) errors.firstName = 'First name is required';
		if (!formData.lastName) errors.lastName = 'Last name is required';
		if (!formData.phone) errors.phone = 'Phone number is required';
		if (!formData.address) errors.address = 'Address is required';
		if (!formData.city) errors.city = 'City is required';
		if (!formData.state) errors.state = 'State is required';

		formErrors = errors;
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		// First validate API key
		const apiKeyError = validateApiKey();
		if (apiKeyError) {
			paymentError = apiKeyError;
			console.log(paymentError);
			return;
		}

		if (!validateForm()) return;

		isProcessing = true;
		paymentError = '';

		try {
			await initializePayment();
		} catch (error) {
			console.error('Checkout error:', error);
			paymentError = 'An error occurred. Please try again.';
		} finally {
			isProcessing = false;
		}
	};

	const initializePayment = async () => {
		console.log('🔑 Using Paystack key:', PAYSTACK_PUBLIC_KEY ? '✅ Key loaded' : '❌ No key');

		if (!paystackLoaded) {
			console.log('📥 Loading Paystack script...');
			const loaded = await loadPaystackScript();
			if (!loaded) {
				paymentError = 'Payment system failed to load. Please refresh the page.';
				return;
			}
		}

		const amountInKobo = Math.round($cart.total * 100);
		const reference = 'EMB_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

		console.log('💳 Payment details:', {
			amount: $cart.total,
			amountInKobo: amountInKobo,
			email: formData.email,
			reference: reference
		});

		try {
			const handler = (window as any).PaystackPop.setup({
				key: PAYSTACK_PUBLIC_KEY,
				email: formData.email,
				amount: amountInKobo,
				currency: 'NGN',
				ref: reference,
				metadata: {
					custom_fields: [
						{
							display_name: 'Customer Name',
							variable_name: 'customer_name',
							value: `${formData.firstName} ${formData.lastName}`
						},
						{
							display_name: 'Phone',
							variable_name: 'customer_phone',
							value: formData.phone
						},
						{
							display_name: 'Shipping Address',
							variable_name: 'shipping_address',
							value: `${formData.address}, ${formData.city}, ${formData.state}`
						},
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
					console.log('✅ Payment successful callback:', response);
					handleSuccessfulPayment(response);
				},
				onClose: function () {
					console.log('❌ Payment window closed by user');
					isProcessing = false;
				}
			});

			handler.openIframe();
		} catch (error) {
			console.error('💥 Payment initialization error:', error);
			paymentError = 'Failed to initialize payment. Please try again.';
			throw error;
		}
	};

	const handleSuccessfulPayment = (response: any) => {
		// Create order summary
		const orderData = {
			...formData,
			paymentReference: response.reference,
			items: $cart.items,
			total: $cart.total,
			orderDate: new Date().toISOString()
		};

		// Store order in localStorage
		const orders = JSON.parse(localStorage.getItem('emb_orders') || '[]');
		orders.push(orderData);
		localStorage.setItem('emb_orders', JSON.stringify(orders));

		// Clear cart and redirect to success page
		cartActions.clearCart();
		goto('/order-success?reference=' + response.reference);
	};

	// Format currency
	const formatCurrency = (amount: number) => {
		return '₦' + amount.toLocaleString();
	};
</script>

<div class="checkout-page">
	<!-- Header -->
	<header class="checkout-header">
		<div class="container">
			<a href="/" class="logo">
				<img src="/logos/svg/EMB-COLOR.svg" alt="EMB Store" />
			</a>
			<h1>Checkout</h1>
		</div>
	</header>

	<!-- Breadcrumb -->
	<nav class="breadcrumb container">
		<a href="/">Home</a>
		<span>/</span>
		<a href="/shop">Shop</a>
		<span>/</span>
		<span class="current">Checkout</span>
	</nav>

	<div class="checkout-container container">
		{#if $cart.items.length === 0}
			<div class="empty-cart">
				<h2>Your cart is empty</h2>
				<p>Add some products to proceed with checkout</p>
				<a href="/shop" class="continue-shopping">Continue Shopping</a>
			</div>
		{:else}
			<div class="checkout-grid">
				<!-- Customer Information Form -->
				<div class="checkout-form-section">
					<h2>Customer Information</h2>
					<form on:submit={handleSubmit} class="checkout-form">
						<div class="form-row">
							<div class="form-group">
								<label for="email">Email Address *</label>
								<input
									id="email"
									type="email"
									bind:value={formData.email}
									class:error={formErrors.email}
									placeholder="your@email.com"
								/>
								{#if formErrors.email}
									<span class="error-message">{formErrors.email}</span>
								{/if}
							</div>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="firstName">First Name *</label>
								<input
									id="firstName"
									type="text"
									bind:value={formData.firstName}
									class:error={formErrors.firstName}
									placeholder="John"
								/>
								{#if formErrors.firstName}
									<span class="error-message">{formErrors.firstName}</span>
								{/if}
							</div>
							<div class="form-group">
								<label for="lastName">Last Name *</label>
								<input
									id="lastName"
									type="text"
									bind:value={formData.lastName}
									class:error={formErrors.lastName}
									placeholder="Doe"
								/>
								{#if formErrors.lastName}
									<span class="error-message">{formErrors.lastName}</span>
								{/if}
							</div>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="phone">Phone Number *</label>
								<input
									id="phone"
									type="tel"
									bind:value={formData.phone}
									class:error={formErrors.phone}
									placeholder="+234 800 000 0000"
								/>
								{#if formErrors.phone}
									<span class="error-message">{formErrors.phone}</span>
								{/if}
							</div>
						</div>

						<div class="form-section-divider">
							<h3>Shipping Address</h3>
						</div>

						<div class="form-row">
							<div class="form-group full-width">
								<label for="address">Street Address *</label>
								<input
									id="address"
									type="text"
									bind:value={formData.address}
									class:error={formErrors.address}
									placeholder="123 Main Street"
								/>
								{#if formErrors.address}
									<span class="error-message">{formErrors.address}</span>
								{/if}
							</div>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="city">City *</label>
								<input
									id="city"
									type="text"
									bind:value={formData.city}
									class:error={formErrors.city}
									placeholder="Lagos"
								/>
								{#if formErrors.city}
									<span class="error-message">{formErrors.city}</span>
								{/if}
							</div>
							<div class="form-group">
								<label for="state">State *</label>
								<select id="state" bind:value={formData.state} class:error={formErrors.state}>
									<option value="">Select State</option>
									{#each nigerianStates as state (state)}
										<option value={state}>{state}</option>
									{/each}
								</select>
								{#if formErrors.state}
									<span class="error-message">{formErrors.state}</span>
								{/if}
							</div>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="country">Country</label>
								<input id="country" type="text" bind:value={formData.country} disabled />
							</div>
							<div class="form-group">
								<label for="postalCode">Postal Code</label>
								<input
									id="postalCode"
									type="text"
									bind:value={formData.postalCode}
									placeholder="100001"
								/>
							</div>
						</div>

						<button type="submit" class="submit-button" disabled={isProcessing}>
							{#if isProcessing}
								<span class="spinner"></span>
								Processing...
							{:else}
								Pay {formatCurrency($cart.total)}
							{/if}
						</button>
					</form>
				</div>

				<!-- Order Summary -->
				<div class="order-summary-section">
					<h2>Order Summary</h2>
					<div class="order-summary">
						<div class="order-items">
							{#each $cart.items as item (item.product.name)}
								<div class="order-item">
									<img src={item.product.image} alt={item.product.name} />
									<div class="item-details">
										<h4>{item.product.name}</h4>
										<p class="item-category">{item.product.category}</p>
										<p class="item-quantity">Qty: {item.quantity}</p>
									</div>
									<div class="item-total">
										{formatCurrency(item.product.price * item.quantity)}
									</div>
								</div>
							{/each}
						</div>

						<div class="order-totals">
							<div class="total-row">
								<span>Subtotal:</span>
								<span>{formatCurrency($cart.total)}</span>
							</div>
							<div class="total-row">
								<span>Shipping:</span>
								<span>Calculated at checkout</span>
							</div>
							<div class="total-row grand-total">
								<span>Total:</span>
								<span>{formatCurrency($cart.total)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.checkout-page {
		min-height: 100vh;
		background: #f8f8f8;
	}

	.checkout-header {
		background: #000;
		color: white;
		padding: 20px 0;
	}

	.checkout-header .container {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.logo img {
		height: 40px;
		width: auto;
	}

	.checkout-header h1 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.breadcrumb {
		padding: 20px 0;
		background: white;
		border-bottom: 1px solid #eee;
	}

	.breadcrumb a {
		color: #666;
		text-decoration: none;
	}

	.breadcrumb a:hover {
		color: #000;
	}

	.breadcrumb .current {
		color: #000;
		font-weight: 500;
	}

	.breadcrumb span {
		margin: 0 8px;
		color: #999;
	}

	.checkout-container {
		padding: 40px 0;
	}

	.empty-cart {
		text-align: center;
		padding: 60px 20px;
		background: white;
		border-radius: 8px;
	}

	.continue-shopping {
		background: #000;
		color: white;
		padding: 12px 24px;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
	}

	.checkout-grid {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 40px;
		align-items: start;
	}

	.checkout-form-section,
	.order-summary-section {
		background: white;
		border-radius: 12px;
		padding: 30px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.checkout-form-section h2,
	.order-summary-section h2 {
		margin: 0 0 24px 0;
		font-size: 1.5rem;
		font-weight: 600;
		color: #000;
	}

	.form-section-divider {
		margin: 30px 0 20px 0;
		padding-top: 20px;
		border-top: 1px solid #eee;
	}

	.form-section-divider h3 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: #333;
	}

	.checkout-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	.form-group.full-width {
		grid-column: 1 / -1;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-group label {
		font-weight: 500;
		margin-bottom: 6px;
		color: #333;
		font-size: 0.9rem;
	}

	.form-group input,
	.form-group select {
		padding: 12px 16px;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 0.9rem;
		transition: border-color 0.3s ease;
	}

	.form-group input:focus,
	.form-group select:focus {
		outline: none;
		border-color: #000;
		box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
	}

	.form-group input.error,
	.form-group select.error {
		border-color: #dc2626;
	}

	.error-message {
		color: #dc2626;
		font-size: 0.8rem;
		margin-top: 4px;
	}

	.submit-button {
		background: #000;
		color: white;
		border: none;
		padding: 16px 32px;
		border-radius: 8px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-top: 10px;
	}

	.submit-button:hover:not(:disabled) {
		background: #333;
	}

	.submit-button:disabled {
		background: #ccc;
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

	.order-summary {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.order-items {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.order-item {
		display: flex;
		gap: 12px;
		padding-bottom: 16px;
		border-bottom: 1px solid #f0f0f0;
	}

	.order-item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.order-item img {
		width: 60px;
		height: 60px;
		object-fit: cover;
		border-radius: 6px;
	}

	.item-details {
		flex: 1;
	}

	.item-details h4 {
		margin: 0 0 4px 0;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.item-category {
		margin: 0 0 4px 0;
		font-size: 0.8rem;
		color: #666;
	}

	.item-quantity {
		margin: 0;
		font-size: 0.8rem;
		color: #999;
	}

	.item-total {
		font-weight: 600;
		font-size: 0.9rem;
	}

	.order-totals {
		border-top: 1px solid #eee;
		padding-top: 20px;
	}

	.total-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
		font-size: 0.9rem;
	}

	.grand-total {
		border-top: 1px solid #eee;
		padding-top: 12px;
		margin-top: 12px;
		font-weight: 700;
		font-size: 1.1rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 968px) {
		.checkout-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.form-row {
			grid-template-columns: 1fr;
		}

		.checkout-form-section,
		.order-summary-section {
			padding: 20px;
		}
	}
</style>
