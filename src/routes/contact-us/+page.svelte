<script lang="ts">
	let formSubmitted = false;
	let formError = false;
	let isLoading = false;

	// Form fields
	let name = '';
	let email = '';
	let phone = '';
	let company = '';
	let message = '';

	// Form validation
	let errors = {
		name: '',
		email: '',
		phone: '',
		message: ''
	};

	const validateForm = () => {
		let valid = true;
		errors = { name: '', email: '', phone: '', message: '' };

		if (!name.trim()) {
			errors.name = 'Name is required';
			valid = false;
		}

		if (!email.trim()) {
			errors.email = 'Email is required';
			valid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Please enter a valid email address';
			valid = false;
		}

		if (phone && !/^[+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''))) {
			errors.phone = 'Please enter a valid phone number';
			valid = false;
		}

		if (!message.trim()) {
			errors.message = 'Message is required';
			valid = false;
		} else if (message.trim().length < 10) {
			errors.message = 'Message must be at least 10 characters long';
			valid = false;
		}

		return valid;
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		if (!validateForm()) return;

		isLoading = true;
		formError = false;

		try {
			// FormSubmit.co integration
			const form = e.target as HTMLFormElement;
			form.submit();

			// Reset form
			name = '';
			email = '';
			phone = '';
			company = '';
			message = '';

			formSubmitted = true;

			// Hide success message after 5 seconds
			setTimeout(() => {
				formSubmitted = false;
			}, 5000);
		} catch (error) {
			console.error('Form submission error:', error);
			formError = true;
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="contact-page">
	<!-- Header Section -->
	<header class="page-header">
		<div class="container">
			<h1 class="page-title">Contact Us</h1>
			<p class="page-subtitle">
				We'd love to hear from you. Get in touch with any questions or inquiries.
			</p>
		</div>
	</header>

	<!-- Breadcrumb -->
	<div class="breadcrumb-section container">
		<nav class="breadcrumb" aria-label="Breadcrumb">
			<a href="/" class="breadcrumb-link">Home</a>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-current">Contact Us</span>
		</nav>
	</div>

	<!-- Main Content -->
	<div class="contact-content container">
		<div class="contact-grid">
			<!-- Contact Information -->
			<div class="contact-info">
				<h2>Get In Touch</h2>
				<p class="info-description">
					Have questions about our products or services? We're here to help and would be delighted
					to assist you with anything you need.
				</p>

				<div class="contact-methods">
					<div class="contact-method">
						<div class="method-icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
									stroke="currentColor"
									stroke-width="2"
								/>
								<path
									d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
									stroke="currentColor"
									stroke-width="2"
								/>
							</svg>
						</div>
						<div class="method-details">
							<h3>Our Warehouse</h3>
							<p>No.2 Alhaji Masha Road<br />Surulere<br />Lagos, Nigeria</p>
						</div>
					</div>

					<div class="contact-method">
						<div class="method-icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M22 16.92V19.92C22 20.52 21.53 20.99 20.96 21.02C20.46 21.05 19.83 21.07 19.2 21.08C10.73 21.15 3.34 13.76 3 6.00002C2.93 4.95002 2.95 4.17002 2.98 3.54002C3.01 2.97002 3.48 2.50002 4.08 2.50002H7.08C7.57 2.50002 7.98 2.82002 8.07 3.30002C8.21 4.05002 8.41 4.78002 8.66 5.48002C8.78 5.81002 8.7 6.18002 8.45 6.43002L7.21 7.67002C8.46 10.63 10.88 13.05 13.84 14.3L15.08 13.06C15.33 12.81 15.7 12.73 16.03 12.85C16.73 13.1 17.46 13.3 18.21 13.44C18.69 13.53 19 13.94 19 14.43V17.43"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
						<div class="method-details">
							<h3>Call Us</h3>
							<p>+234 912 314 6458<br />+234 704 617 2030</p>
						</div>
					</div>

					<div class="contact-method">
						<div class="method-icon">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
									stroke="currentColor"
									stroke-width="2"
								/>
								<path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" />
							</svg>
						</div>
						<div class="method-details">
							<h3>Email Us</h3>
							<p>info@odibohannah.com.ng<br />odibohannahindustries@gmail.com</p>
						</div>
					</div>
				</div>

				<div class="business-hours">
					<h3>Business Hours</h3>
					<div class="hours-list">
						<div class="hour-item">
							<span>Monday - Friday</span>
							<span>9:00 AM - 6:00 PM</span>
						</div>
						<div class="hour-item">
							<span>Saturday</span>
							<span>10:00 AM - 4:00 PM</span>
						</div>
						<div class="hour-item">
							<span>Sunday</span>
							<span>Closed</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="contact-form-container">
				<h2>Send Us a Message</h2>

				<!-- Success Message -->
				{#if formSubmitted}
					<div class="alert alert-success" role="alert">
						<div class="alert-icon">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="alert-content">
							<h4>Message Sent Successfully!</h4>
							<p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
						</div>
					</div>
				{/if}

				<!-- Error Message -->
				{#if formError}
					<div class="alert alert-error" role="alert">
						<div class="alert-icon">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="alert-content">
							<h4>Submission Failed</h4>
							<p>There was an error sending your message. Please try again.</p>
						</div>
					</div>
				{/if}

				<form
					class="contact-form"
					method="POST"
					action="https://formsubmit.co/your-email@example.com"
					on:submit={handleSubmit}
				>
					<!-- FormSubmit.co Configuration -->
					<input type="hidden" name="_subject" value="New Contact Form Submission" />
					<input type="hidden" name="_template" value="table" />
					<input type="hidden" name="_captcha" value="false" />
					<input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />

					<div class="form-row">
						<div class="form-group">
							<label for="name" class="form-label">Full Name *</label>
							<input
								id="name"
								name="name"
								type="text"
								class="form-input {errors.name ? 'error' : ''}"
								bind:value={name}
								required
							/>
							{#if errors.name}
								<span class="error-message">{errors.name}</span>
							{/if}
						</div>

						<div class="form-group">
							<label for="email" class="form-label">Email Address *</label>
							<input
								id="email"
								name="email"
								type="email"
								class="form-input {errors.email ? 'error' : ''}"
								bind:value={email}
								required
							/>
							{#if errors.email}
								<span class="error-message">{errors.email}</span>
							{/if}
						</div>
					</div>

					<div class="form-row">
						<div class="form-group">
							<label for="phone" class="form-label">Phone Number</label>
							<input
								id="phone"
								name="phone"
								type="tel"
								class="form-input {errors.phone ? 'error' : ''}"
								bind:value={phone}
							/>
							{#if errors.phone}
								<span class="error-message">{errors.phone}</span>
							{/if}
						</div>

						<div class="form-group">
							<label for="company" class="form-label">Company</label>
							<input
								id="company"
								name="company"
								type="text"
								class="form-input"
								bind:value={company}
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="message" class="form-label">Message *</label>
						<textarea
							id="message"
							name="message"
							rows="6"
							class="form-textarea {errors.message ? 'error' : ''}"
							bind:value={message}
							required
						></textarea>
						{#if errors.message}
							<span class="error-message">{errors.message}</span>
						{/if}
					</div>

					<button type="submit" class="submit-button" disabled={isLoading}>
						{#if isLoading}
							<span class="button-loading">
								<svg class="spinner" viewBox="0 0 24 24">
									<circle
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
										fill="none"
									/>
								</svg>
								Sending...
							</span>
						{:else}
							Send Message
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	/* Page Header */
	.page-header {
		background-color: #000;
		color: #fff;
		padding: 60px 0;
		text-align: center;
	}

	.page-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 16px;
	}

	.page-subtitle {
		font-size: 1.1rem;
		opacity: 0.8;
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	/* Breadcrumb */
	.breadcrumb-section {
		padding: 20px 0;
		border-bottom: 1px solid #eee;
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

	/* Contact Content */
	.contact-content {
		padding: 60px 0;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 60px;
		align-items: start;
	}

	/* Contact Info */
	.contact-info {
		margin: 10px;
	}

	.contact-info h2 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-bottom: 16px;
		color: #000;
	}

	.info-description {
		color: #666;
		line-height: 1.6;
		margin-bottom: 40px;
	}

	.contact-methods {
		margin-bottom: 40px;
	}

	.contact-method {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		margin-bottom: 30px;
	}

	.method-icon {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		background: #f8f8f8;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #000;
	}

	.method-details h3 {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 8px;
		color: #000;
	}

	.method-details p {
		color: #666;
		line-height: 1.5;
	}

	.business-hours h3 {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 16px;
		color: #000;
	}

	.hours-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.hour-item {
		display: flex;
		justify-content: space-between;
		padding-bottom: 12px;
		border-bottom: 1px solid #f0f0f0;
	}

	.hour-item:last-child {
		border-bottom: none;
	}

	.hour-item span:first-child {
		color: #666;
	}

	.hour-item span:last-child {
		font-weight: 500;
		color: #000;
	}

	/* Contact Form */
	.contact-form-container h2 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-bottom: 24px;
		color: #000;
	}

	.contact-form-container {
		margin: 20px;
	}

	/* Alerts */
	.alert {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 16px;
		border-radius: 8px;
		margin-bottom: 24px;
	}

	.alert-success {
		background: #f0f9f4;
		border: 1px solid #bbf7d0;
		color: #166534;
	}

	.alert-error {
		background: #fef2f2;
		border: 1px solid #fecaca;
		color: #991b1b;
	}

	.alert-icon {
		flex-shrink: 0;
		margin-top: 2px;
	}

	.alert-content h4 {
		font-weight: 600;
		margin-bottom: 4px;
	}

	.alert-content p {
		font-size: 0.9rem;
		opacity: 0.9;
	}

	/* Form Styles */
	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-label {
		font-weight: 500;
		margin-bottom: 8px;
		color: #333;
	}

	.form-input,
	.form-textarea {
		padding: 12px 16px;
		border: 2px solid #e5e5e5;
		border-radius: 6px;
		font-size: 1rem;
		transition: all 0.2s ease;
		background: white;
	}

	.form-input:focus,
	.form-textarea:focus {
		outline: none;
		border-color: #000;
		box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
	}

	.form-input.error,
	.form-textarea.error {
		border-color: #dc2626;
	}

	.error-message {
		color: #dc2626;
		font-size: 0.875rem;
		margin-top: 4px;
	}

	.form-textarea {
		resize: vertical;
		min-height: 120px;
		font-family: inherit;
	}

	/* Submit Button */
	.submit-button {
		background: #000;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 16px 32px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.submit-button:hover:not(:disabled) {
		background: #333;
		transform: translateY(-1px);
	}

	.submit-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	.button-loading {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.spinner {
		width: 16px;
		height: 16px;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Responsive Design */
	@media (max-width: 968px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}

		.contact-info {
			order: 2;
		}

		.contact-form-container {
			order: 1;
		}
	}

	@media (max-width: 640px) {
		.page-header {
			padding: 40px 0;
		}

		.page-title {
			font-size: 2rem;
		}

		.contact-content {
			padding: 40px 0;
		}

		.form-row {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.contact-method {
			flex-direction: column;
			text-align: center;
		}

		.method-icon {
			align-self: center;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 15px;
		}

		.page-title {
			font-size: 1.75rem;
		}

		.contact-methods {
			margin-bottom: 30px;
		}
	}
</style>
