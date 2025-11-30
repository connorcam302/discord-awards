<a href="/login">Login</a>

<script lang="ts">
  import type { PageData } from './$types'
  
  let { data }: { data: PageData } = $props()
  
  let user = $derived(data.user)
  let session = $derived(data.session)

  $effect(async () => {
  console.log(session)
  console.log(user)
  })
</script>

{#if user}
  <div>
    <h1>Welcome, {user.user_metadata?.full_name || user.email}!</h1>
    <p>Email: {user.email}</p>
    <p>User ID: {user.id}</p>
    
    {#if user.user_metadata?.avatar_url}
      <img src={user.user_metadata.avatar_url} alt="Avatar" />
    {/if}
  </div>
{:else}
  <p>Not logged in</p>
{/if}
