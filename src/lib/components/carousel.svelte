<script lang="ts">
	type carousel = {
		desktop: string;
		laptop: string;
		tablet: string;
		phone: string;
	};

	// Sample carousel data with placeholder images
	const carouselItems: carousel[] = [
		{
			desktop: 'https://placehold.co/1920x1080/4F46E5/FFFFFF?text=Desktop+1',
			laptop: 'https://placehold.co/1366x768/4F46E5/FFFFFF?text=Laptop+1',
			tablet: 'https://placehold.co/768x1024/4F46E5/FFFFFF?text=Tablet+1',
			phone: 'https://placehold.co/480x800/4F46E5/FFFFFF?text=Phone+1'
		},
		{
			desktop: 'https://placehold.co/1920x1080/10B981/FFFFFF?text=Desktop+2',
			laptop: 'https://placehold.co/1366x768/10B981/FFFFFF?text=Laptop+2',
			tablet: 'https://placehold.co/768x1024/10B981/FFFFFF?text=Tablet+2',
			phone: 'https://placehold.co/480x800/10B981/FFFFFF?text=Phone+2'
		},
		{
			desktop: 'https://placehold.co/1920x1080/EF4444/FFFFFF?text=Desktop+3',
			laptop: 'https://placehold.co/1366x768/EF4444/FFFFFF?text=Laptop+3',
			tablet: 'https://placehold.co/768x1024/EF4444/FFFFFF?text=Tablet+3',
			phone: 'https://placehold.co/480x800/EF4444/FFFFFF?text=Phone+3'
		},
		{
			desktop: 'https://placehold.co/1920x1080/F59E0B/FFFFFF?text=Desktop+4',
			laptop: 'https://placehold.co/1366x768/F59E0B/FFFFFF?text=Laptop+4',
			tablet: 'https://placehold.co/768x1024/F59E0B/FFFFFF?text=Tablet+4',
			phone: 'https://placehold.co/480x800/F59E0B/FFFFFF?text=Phone+4'
		}
	];

	let currentIndex = 0;
	let autoplayInterval: NodeJS.Timeout;

	// Auto-advance the carousel
	function startAutoplay() {
		autoplayInterval = setInterval(() => {
			currentIndex = (currentIndex + 1) % carouselItems.length;
		}, 10000); // Change every 10 seconds
	}

	function stopAutoplay() {
		if (autoplayInterval) {
			clearInterval(autoplayInterval);
		}
	}

	function nextSlide() {
		currentIndex = (currentIndex + 1) % carouselItems.length;
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
	}

	function goToSlide(index: number) {
		currentIndex = index;
	}

	// Get appropriate image based on screen size
	function getCurrentImage(item: carousel): string {
		if (typeof window === 'undefined') return item.desktop; // SSR fallback

		const width = window.innerWidth;

		if (width < 480) return item.phone;
		if (width < 768) return item.tablet;
		if (width < 1024) return item.laptop;
		return item.desktop;
	}

	// Start autoplay when component mounts
	import { onMount } from 'svelte';
	onMount(() => {
		startAutoplay();
		return () => stopAutoplay();
	});
</script>

<div class="carousel-container" on:mouseenter={stopAutoplay} on:mouseleave={startAutoplay}>
	<!-- Main Carousel Slide -->
	<div class="carousel-slide">
		{#each carouselItems as item, index}
			<div
				class="slide {index === currentIndex ? 'active' : ''}"
				style:opacity={index === currentIndex ? 1 : 0}
			>
				<img
					src={getCurrentImage(item)}
					alt={`Carousel slide ${index + 1}`}
					class="carousel-image"
				/>
			</div>
		{/each}
	</div>

	<!-- Navigation Arrows -->
	<button class="carousel-btn prev" on:click={prevSlide} aria-label="Previous slide">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<path d="M15 18l-6-6 6-6" />
		</svg>
	</button>

	<button class="carousel-btn next" on:click={nextSlide} aria-label="Next slide">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<path d="M9 18l6-6-6-6" />
		</svg>
	</button>

	<!-- Indicators/Dots -->
	<div class="carousel-indicators">
		{#each carouselItems as _, index}
			<button
				class="indicator {index === currentIndex ? 'active' : ''}"
				on:click={() => goToSlide(index)}
				aria-label={`Go to slide ${index + 1}`}
			></button>
		{/each}
	</div>
</div>

<style>
	.carousel-container {
		position: relative;
		width: 100%;
		/* height: 500px; */
		overflow: hidden;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	}

	.carousel-slide {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: opacity 0.5s ease-in-out;
	}

	.carousel-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.carousel-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		border: none;
		border-radius: 50%;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
	}

	.carousel-btn:hover {
		transform: translateY(-50%) scale(1.1);
	}

	.carousel-btn.prev {
		left: 20px;
	}

	.carousel-btn.next {
		right: 20px;
	}

	.carousel-indicators {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 8px;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.indicator.active {
		background: rgba(255, 255, 255, 1);
		transform: scale(1.2);
	}

	.indicator:hover {
		background: rgba(255, 255, 255, 0.8);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.carousel-container {
			height: 400px;
		}

		.carousel-btn {
			width: 40px;
			height: 40px;
		}
	}

	@media (max-width: 480px) {
		.carousel-container {
			height: 300px;
		}

		.carousel-btn {
			width: 36px;
			height: 36px;
		}

		.carousel-btn.prev {
			left: 10px;
		}

		.carousel-btn.next {
			right: 10px;
		}
	}
</style>
