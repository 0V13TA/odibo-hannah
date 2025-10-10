<script lang="ts">
  import { toasts } from '$lib/utils/toast';
  
  const getToastClass = (type: string) => {
    const classes = {
      success: 'toast-success',
      error: 'toast-error',
      warning: 'toast-warning',
      info: 'toast-info'
    };
    return classes[type] || 'toast-info';
  };
</script>

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <div class="toast {getToastClass(toast.type)}">
      <div class="toast-content">
        <strong class="toast-message">{toast.message}</strong>
        {#if toast.description}
          <p class="toast-description">{toast.description}</p>
        {/if}
      </div>
      <button 
        class="toast-close"
        on:click={() => toasts.remove(toast.id)}
      >
        ×
      </button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .toast {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 400px;
    animation: slideIn 0.3s ease-out;
  }

  .toast-success {
    background: #f0f9f4;
    border: 1px solid #bbf7d0;
    color: #166534;
  }

  .toast-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
  }

  .toast-warning {
    background: #fffbeb;
    border: 1px solid #fed7aa;
    color: #92400e;
  }

  .toast-info {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
    color: #0369a1;
  }

  .toast-content {
    flex: 1;
  }

  .toast-message {
    display: block;
    margin-bottom: 4px;
    font-size: 0.9rem;
  }

  .toast-description {
    margin: 0;
    font-size: 0.8rem;
    opacity: 0.9;
    line-height: 1.4;
  }

  .toast-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0.7;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toast-close:hover {
    opacity: 1;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
