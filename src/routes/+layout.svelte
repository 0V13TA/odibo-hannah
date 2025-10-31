<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics();
	injectSpeedInsights();
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
	<!-- Basic Meta -->
	<title>Odibo Hannah - Quality Products in Nigeria</title>
	<meta
		name="description"
		content="Discover quality products at Odibo Hannah. Shop fashion, beauty, home decor, jewelry and more with secure payment and fast delivery across Nigeria."
	/>
	<meta
		name="keywords"
		content="Odibo Hannah, Nigeria e-commerce, online shopping, fashion, beauty, home decor, jewelry, lagos shopping"
	/>

	<!-- Open Graph -->
	<meta property="og:title" content="Odibo Hannah - Quality Products in Nigeria" />
	<meta
		property="og:description"
		content="Discover quality products at Odibo Hannah. Shop fashion, beauty, home decor, jewelry and more with secure payment and fast delivery across Nigeria."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://odibohannah.com.ng" />
	<meta property="og:image" content="https://odibohannah.com.ng/og-image.jpg" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Odibo Hannah - Quality Products in Nigeria" />
	<meta
		name="twitter:description"
		content="Discover quality products at Odibo Hannah. Shop fashion, beauty, home decor, jewelry and more with secure payment and fast delivery across Nigeria."
	/>
	<meta name="twitter:image" content="https://odibohannah.com.ng/twitter-image.jpg" />

	<!-- Additional -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="canonical" href="https://odibohannah.com.ng" />
</svelte:head>

<Navbar />
{@render children?.()}
<Footer />
