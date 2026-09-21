<script lang="ts">
	import { onMount } from 'svelte';
	import { cart } from '$lib/stores/cartStore';
	import CartMenu from '$lib/components/cartMenu.svelte';

	let menuList: HTMLUListElement | null = $state(null);
	let cartMenu: { open: () => void };

	const openCart = () => cartMenu.open();

	function closeMenu() {
		menuList!.classList.add('hidden');
	}

	function openMenu() {
		const menuList = <HTMLUListElement>document.querySelector('#menu > ul')!;
		menuList.classList.remove('hidden');
		menuList.focus();
	}

	function handleKeyDown() {
		closeMenu();
	}

	onMount(() => {
		addEventListener('keydown', (e) => {
			if (e.key === 'Escape') closeMenu();
		});
	});
</script>

<nav>
	<div id="menu">
		<button id="logo" onclick={openMenu} aria-label="Menu">
			<div id="hamburger">
				<div class="line"></div>
				<div class="line"></div>
				<div class="line"></div>
			</div>
		</button>

		<ul class="hidden" bind:this={menuList} tabindex="-1">
    <li class="nav-logo">
        <a onclick={closeMenu} href="/">
            <img src="/logos/png/COLOR.png" alt="Sites Logo" width="120" />
        </a>
    </li>
			<li>
				<a onclick={closeMenu} href="/">Home</a>
			</li>
			<li>
				<a onclick={closeMenu} href="/about-us">About Us</a>
			</li>
			<li>
				<a onclick={closeMenu} href="/shop">Shop</a>
			</li>
			<li>
				<a onclick={closeMenu} href="/contact-us">Contact Us</a>
			</li>
		</ul>
		<div class="backdrop" onclick={closeMenu} onkeydown={handleKeyDown} role="none"></div>
	</div>
	<a href="/"> <img src="/logos/png/COLOR.png" alt="Sites Logo" width="100" /> </a>
	<button id="shopping" onclick={openCart}>
		<img src="/shopping.svg" alt="Wishlist" height="20" width="20" />
		{#if $cart.itemCount > 0}
			<span class="cart-badge">{$cart.itemCount}</span>
		{/if}
	</button>
</nav>

<CartMenu bind:this={cartMenu} />

<style>
	nav {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 999;
		background-color: white;
		box-shadow: 0 0 10px 0px black;
	}

	#menu ul {
        top: 0;
        left: 0;
        z-index: 999;
        height: 100dvh;
        width: 75dvw; /* Increased width from 30dvw for a proper drawer feel */
        max-width: 350px; /* Prevents it from getting too wide on tablets */
        display: flex;
        outline: none;
        position: fixed;
        flex-direction: column;
        background-color: white;
        box-shadow: 4px 0 25px rgba(0, 0, 0, 0.15); /* Adds depth */
        transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* Smoother sliding animation */
    }

#menu ul li:first-child {
    padding: 10px 0px;
    display: flex;
    justify-content: center;
  }

#menu ul li:first-child a {
    width: fit-content;
  }

    #menu ul.hidden {
        left: -100%;
        cursor: default;
        user-select: none;
        pointer-events: none;
        box-shadow: none;
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
        background-color: rgba(0, 0, 0, 0.4); /* Slightly darker backdrop for better contrast */
        transition: opacity 0.4s ease-in-out;
        z-index: 998;
    }

    #menu ul.hidden + .backdrop {
        opacity: 0;
        left: -100dvw;
        cursor: default;
        user-select: none;
        pointer-events: none;
        transition: opacity 0.4s ease-in-out, left 0s 0.4s;
    }

    #menu ul li {
        width: 100%;
        list-style: none;
    }

    #menu ul li a {
        width: 100%;
        display: block;
        padding: 18px 30px; /* Generous padding for touch targets */
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 1px; /* Improved readability */
        border-bottom: 1px solid #f0f0f0; /* Softer, barely-there separator */
        transition: background-color 0.2s ease, padding-left 0.2s ease;
    }

    #menu ul li a:hover, 
    #menu ul li a:active {
        background-color: #f9f9f9;
        padding-left: 35px; /* Subtle inward slide on interaction */
        color: #000;
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

	button#shopping span {
		--radius: 17px;

		top: -5px;
		right: -5px;
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
			width: auto;
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
		nav > a > img {
			order: 1;
			margin-right: auto;
		}

		/* Position menu in center */
		#menu {
			order: 2;
			margin-left: auto;
		}

		/* Position shopping cart on right */
		button#shopping {
			order: 3;
			margin-left: auto;
		}
	}
</style>
