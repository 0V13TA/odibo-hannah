<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  let orderReference = '';
  
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    orderReference = urlParams.get('reference') || '';
  });
</script>

<div class="success-page">
  <div class="container">
    <div class="success-content">
      <div class="success-icon">🎉</div>
      <h1>Order Confirmed!</h1>
      <p>Thank you for your purchase. Your order has been successfully processed.</p>
      
      {#if orderReference}
        <div class="order-reference">
          <strong>Reference Number:</strong> {orderReference}
        </div>
      {/if}
      
      <p>You will receive an email confirmation shortly with your order details.</p>
      
      <div class="success-actions">
        <a href="/shop" class="continue-shopping">Continue Shopping</a>
        <a href="/" class="go-home">Back to Home</a>
      </div>
    </div>
  </div>
</div>

<style>
  .success-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
    padding: 40px 20px;
  }

  .success-content {
    background: white;
    padding: 60px 40px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 100%;
  }

  .success-icon {
    font-size: 4rem;
    margin-bottom: 20px;
  }

  .success-content h1 {
    margin: 0 0 16px 0;
    color: #000;
    font-size: 2rem;
  }

  .success-content p {
    margin: 0 0 16px 0;
    color: #666;
    line-height: 1.6;
  }

  .order-reference {
    background: #f0f9f4;
    border: 1px solid #bbf7d0;
    padding: 12px 16px;
    border-radius: 6px;
    margin: 20px 0;
    color: #166534;
  }

  .success-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 30px;
  }

  .continue-shopping {
    background: #000;
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
  }

  .go-home {
    background: #f5f5f5;
    color: #333;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    border: 1px solid #ddd;
  }

  @media (max-width: 480px) {
    .success-actions {
      flex-direction: column;
    }
    
    .success-content {
      padding: 40px 20px;
    }
  }
</style>
