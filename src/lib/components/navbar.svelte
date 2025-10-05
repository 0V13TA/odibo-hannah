<script lang="ts">
	import { onMount } from 'svelte';
	let menuList: HTMLUListElement | null = null;

	function closeMenu() {
		menuList!.classList.add('hidden');
	}

	function openMenu() {
		const menuList = <HTMLUListElement>document.querySelector('#menu > ul')!;
		menuList.classList.remove('hidden');
		menuList.focus();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeMenu();
	}

	onMount(() => {
		addEventListener('keydown', (e) => {
			if (e.key === 'Escape') closeMenu();
		});
	});
</script>

<nav>
	<div id="menu">
		<button id="logo" on:click={openMenu}>
			<div id="hamburger">
				<div class="line"></div>
				<div class="line"></div>
				<div class="line"></div>
			</div>
			<p>Menu</p>
		</button>

		<ul class="hidden" bind:this={menuList} tabindex="-1">
			<div id="search">
				<input type="text" placeholder="Search for products" />
				<img src="/search.svg" alt="search icon" height="25" width="25" />
			</div>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/about-us">About Us</a>
			</li>
			<li>
				<a href="/shop">Shop</a>
			</li>
			<li>
				<a href="/contact-us">Contact Us</a>
			</li>
		</ul>
		<div class="backdrop" on:click={closeMenu} on:keydown={handleKeyDown} role="none"></div>
	</div>
	<img src="/logos/png/COLOR.png" alt="Sites Logo" width="100" />
	<button id="shopping"><img src="/shopping.svg" alt="Wishlist" height="20" width="20" /></button>
</nav>

<style>
	#menu ul {
		top: 0;
		left: 0;
		z-index: 999;
		height: 100dvh;
		display: flex;
		outline: none;
		position: fixed;
		flex-direction: column;
		background-color: white;
		transition: left 0.5s ease-in-out;
	}

	#menu ul.hidden {
		left: -100%;
		cursor: default;
		user-select: none;
		pointer-events: none;
		transition: left 0.5s ease-in-out;
	}

	#menu ul * {
		z-index: 999;
	}

	.backdrop {
		top: 0;
		left: 0;
		height: 100%;
		width: 100dvw;
		position: fixed;
		background-color: #00000033;
		transition: opacity 0.5s ease-in-out;
	}

	#menu ul.hidden + * {
		opacity: 0;
		left: -100dvw;
		cursor: default;
		user-select: none;
		pointer-events: none;
		transition: opacity 0.9s ease-in-out;
	}

	#search {
		display: flex;
		padding: 20px 10px;
		box-shadow: 0 1px 3px black;
	}

	#search input {
		padding: 0;
		border: none;
		height: 100%;
		outline: none;
	}

	#search input:focus {
		border: none;
		outline: none;
		box-shadow: none;
	}

	#menu ul li {
		width: 100%;
		font-weight: bolder;
		text-transform: uppercase;
		border-bottom: 1px solid grey;
	}

	#menu ul li a {
		width: 100%;
		height: 100%;
		padding: 20px 10px;
		display: inline-block;
	}

	#logo {
		gap: 10px;
		display: flex;
		cursor: pointer;
		align-items: center;
	}

	#logo * {
		transition:
			color 0.5s ease-in-out,
			background-color 0.5s ease-in-out;
	}

	#logo:hover .line {
		background-color: grey;
	}

	#logo:hover p {
		color: grey;
	}

	nav {
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	button#shopping {
		position: relative;
		height: fit-content;
	}

	button#shopping::after {
		--radius: 17px;

		top: -5px;
		right: -5px;
		content: '0';
		color: white;
		display: grid;
		border-radius: 50%;
		font-size: smaller;
		position: absolute;
		place-items: center;
		width: var(--radius);
		height: var(--radius);
		background-color: black;
	}

	#hamburger {
		gap: 5px;
		width: 30px;
		display: flex;
		flex-direction: column;
	}

	#hamburger .line {
		width: 100%;
		height: 2px;
		background-color: black;
	}

	@media screen and (width >= 1056px) {
		/* Hide mobile menu button */
		#logo {
			display: none;
		}

		/* Show desktop navigation */
		#menu ul {
			position: static;
			height: auto;
			flex-direction: row;
			align-items: center;
			gap: 30px;
			background: none;
			left: 0 !important; /* Override the hidden state */
		}

		/* Remove hidden class behavior for desktop */
		#menu ul.hidden {
			position: static;
			left: 0;
			pointer-events: all;
			user-select: auto;
			cursor: auto;
			display: flex !important;
		}

		/* Hide search and backdrop on desktop */
		#search,
		.backdrop {
			display: none;
		}

		/* Style desktop menu items */
		#menu ul li {
			width: auto;
			border-bottom: none;
			font-weight: normal;
		}

		#menu ul li a {
			padding: 10px 15px;
			color: #333;
			text-decoration: none;
			font-size: 16px;
			transition: color 0.3s ease;
		}

		#menu ul li a:hover {
			color: #666;
		}

		/* Rearrange layout for desktop */
		nav {
			justify-content: center;
			gap: 60px;
			padding: 20px;
		}

		/* Position logo on left */
		nav > img {
			order: 1;
			margin-right: auto;
		}

		/* Position menu in center */
		#menu {
			order: 2;
		}

		/* Position shopping cart on right */
		button#shopping {
			order: 3;
			margin-left: auto;
		}
	}
</style>
