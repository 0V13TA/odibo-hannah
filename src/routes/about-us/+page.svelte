<!-- AboutUs.svelte -->
<script lang="ts">
	// Company stats
	const stats = [
		{ number: '5000+', label: 'Happy Customers' },
		{ number: '1+', label: 'Year of Excellence' },
		{ number: '1+', label: 'Quality Products' },
		{ number: '24/7', label: 'Customer Support' }
	];

	// Values
	const values = [
		{
			icon: 'quality',
			title: 'Resillience',
			description:
				'The Unyielding Spirit We embrace the commitment to adapt and persevere through any challenge, mirroring the strength it took to transition from the farm to the marketplace.'
		},
		{
			icon: 'innovation',
			title: 'Provision',
			description:
				'Commitment to Nourishment. Our dedication is to provide dependable, high-quality, and essential food that ensures the well-being and sustenance of your family.'
		},
		{
			icon: 'community',
			title: 'Hard Work (Grit)',
			description:
				'Excellence Through Effort. We believe in meticulous processes and genuine effort—no shortcuts. This grit is the foundation of our quality and product reliability.'
		},
		{
			icon: 'sustainability',
			title: 'Love & Sacrifice',
			description:
				'Family First. The selfless motivation that built our brand. We treat our customers and partners with the same care and ethical commitment shown to family.'
		},
		{
			icon: 'authentic',
			title: 'Aunthenticity',
			description:
				'Rooted in a Real Story. Our brand is built on a true, lived narrative. We promise transparency and honor the heritage of the staple crops central to our African community.'
		}
	];
</script>

<div class="about-page">
	<!-- Hero Section -->
	<section class="about-hero">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">Our Story</h1>
				<p class="hero-subtitle">
					Odibo Hannah - the brand, is built on purpose, fueled by love. Our legacy is woven from
					corn farms and door-to-door grit—the unyielding spirit that turns vision into provision,
					now shared in every product.
				</p>
			</div>
		</div>
	</section>

	<!-- Breadcrumb -->
	<div class="breadcrumb-section container">
		<nav class="breadcrumb" aria-label="Breadcrumb">
			<a href="/" class="breadcrumb-link">Home</a>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-current">About Us</span>
		</nav>
	</div>

	<!-- Mission Section -->
	<section class="mission-section">
		<div class="container">
			<div class="mission-grid">
				<div class="mission-content">
					<h2>Our Brand Story</h2>
					<p>
						Our story begins with her humble corn farm, where she planted basic varieties just to
						sustain her eight children. That farm was the first lesson in provision and sacrifice.
						To achieve more, she transitioned to the demanding work of trading tomatoes
						door-to-door. Her life became a masterpiece of unwavering resilience, love, and sheer
						hard work—a story woven into the fabric of countless African women today.
					</p>
				</div>
				<div class="mission-content">
					<h2>The Blueprint In Every Product</h2>
					<p>
						Today, that foundational spirit fuels everything we create. The Odibo Hannah brand is a
						promise to share that dedication with you, embodied in every item we make:
					</p>
					<p>
						Every item tells her story. When you choose our products, you're not just buying
						groceries; you're supporting a legacy of love and hard work.
					</p>
					<p>Taste the legacy. Build your purpose. Buy Odibo Hannah today.</p>
				</div>
				<div class="mission-image">
					<img
						src="https://placehold.co/400x400/A3B4CD/FFAAFF?text=Our+Team+Working+Together"
						alt="Our team working together"
						class="image-placeholder"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="stats-section">
		<div class="container">
			<div class="stats-grid">
				{#each stats as stat (stat.label)}
					<div class="stat-item">
						<div class="stat-number">{stat.number}</div>
						<div class="stat-label">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Values Section -->
	<section class="values-section">
		<div class="container">
			<div class="section-header">
				<h2>Our Values</h2>
				<p>The principles that guide everything we do</p>
			</div>
			<div class="values-grid">
				{#each values as value (value.title)}
					<div class="value-card">
						<div class="value-icon">
							{#if value.icon === 'quality'}
								<svg width="48" height="48" viewBox="0 0 24 24" fill="none">
									<path
										d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
										stroke="currentColor"
										stroke-width="2"
									/>
								</svg>
							{:else if value.icon === 'innovation'}
								<svg width="48" height="48" viewBox="0 0 24 24" fill="none">
									<path
										d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							{:else if value.icon === 'community'}
								<svg width="48" height="48" viewBox="0 0 24 24" fill="none">
									<path
										d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
										stroke="currentColor"
										stroke-width="2"
									/>
									<path
										d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
										stroke="currentColor"
										stroke-width="2"
									/>
									<path
										d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
										stroke="currentColor"
										stroke-width="2"
									/>
									<path
										d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
										stroke="currentColor"
										stroke-width="2"
									/>
								</svg>
							{:else if value.icon === 'sustainability'}
								<svg width="48" height="48" viewBox="0 0 24 24" fill="none">
									<path
										d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
										stroke="currentColor"
										stroke-width="2"
									/>
								</svg>
							{/if}
						</div>
						<h3 class="value-title">{value.title}</h3>
						<p class="value-description">{value.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="cta-section">
		<div class="container">
			<div class="cta-content">
				<h2>Ready to Explore Our Collection?</h2>
				<p>Discover the perfect products That Drive You to Build Your Purpose</p>
				<div class="cta-buttons">
					<a href="/shop" class="btn btn-primary">Shop Now</a>
					<a href="/contact-us" class="btn btn-secondary">Contact Us</a>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	/* Hero Section */
	.about-hero {
		background-color: #000;
		color: #fff;
		padding: 80px 0;
		text-align: center;
	}

	.hero-title {
		font-size: 3rem;
		font-weight: 700;
		margin-bottom: 20px;
	}

	.hero-subtitle {
		font-size: 1.2rem;
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

	/* Mission Section */
	.mission-section {
		padding: 80px 0;
	}

	.mission-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		align-items: center;
	}

	.mission-content h2 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 24px;
		color: #000;
	}

	.mission-content p {
		color: #666;
		line-height: 1.7;
		margin-bottom: 20px;
		font-size: 1.1rem;
	}

	.mission-content p:last-child {
		margin-bottom: 0;
	}

	.mission-image {
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.image-placeholder {
		width: 100%;
		height: 400px;
		background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 0.9rem;
	}

	/* Stats Section */
	.stats-section {
		background: #f8f8f8;
		padding: 60px 0;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 40px;
		text-align: center;
	}

	.stat-item {
		padding: 20px;
	}

	.stat-number {
		font-size: 2.5rem;
		font-weight: 700;
		color: #000;
		margin-bottom: 8px;
	}

	.stat-label {
		color: #666;
		font-size: 1rem;
		font-weight: 500;
	}

	/* Section Header */
	.section-header {
		text-align: center;
		margin-bottom: 60px;
	}

	.section-header h2 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 16px;
		color: #000;
	}

	.section-header p {
		color: #666;
		font-size: 1.1rem;
		max-width: 500px;
		margin: 0 auto;
	}

	/* Values Section */
	.values-section {
		padding: 80px 0;
	}

	.values-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 40px;
	}

	.value-card {
		text-align: center;
		padding: 40px 30px;
		border-radius: 12px;
		background: white;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.value-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}

	.value-icon {
		width: 80px;
		height: 80px;
		background: #f8f8f8;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 24px;
		color: #000;
	}

	.value-title {
		font-size: 1.3rem;
		font-weight: 600;
		margin-bottom: 16px;
		color: #000;
	}

	.value-description {
		color: #666;
		line-height: 1.6;
	}

	/* CTA Section */
	.cta-section {
		padding: 80px 0;
		text-align: center;
	}

	.cta-content h2 {
		font-size: 2.2rem;
		font-weight: 700;
		margin-bottom: 16px;
		color: #000;
	}

	.cta-content p {
		color: #666;
		font-size: 1.1rem;
		max-width: 500px;
		margin: 0 auto 40px;
		line-height: 1.6;
	}

	.cta-buttons {
		display: flex;
		gap: 20px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn {
		padding: 16px 32px;
		border-radius: 6px;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		display: inline-block;
	}

	.btn-primary {
		background: #000;
		color: white;
	}

	.btn-primary:hover {
		background: #333;
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: transparent;
		color: #000;
		border: 2px solid #000;
	}

	.btn-secondary:hover {
		background: #000;
		color: white;
		transform: translateY(-2px);
	}

	/* Responsive Design */
	@media (max-width: 968px) {
		.mission-grid,
		.values-grid {
			grid-template-columns: 1fr;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.hero-title {
			font-size: 2.5rem;
		}
	}

	@media (max-width: 640px) {
		.about-hero {
			padding: 60px 0;
		}

		.hero-title {
			font-size: 2rem;
		}

		.hero-subtitle {
			font-size: 1.1rem;
		}

		.mission-section,
		.values-section,
		.cta-section {
			padding: 60px 0;
		}

		.stats-grid {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

		.btn {
			width: 200px;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 0 15px;
		}

		.hero-title {
			font-size: 1.75rem;
		}

		.section-header h2 {
			font-size: 2rem;
		}

		.value-card {
			padding: 30px 20px;
		}
	}
</style>
