<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
	import { supabaseClient } from '$lib/supabase/client.js';
	import { invalidate } from '$app/navigation';
	
	let { children, data} = $props();
	let { session, user } = data;

	console.log(user);
  
  async function signInWithGoogle() {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) console.error(error)
  }

    async function signOut() {
    await data.supabase.auth.signOut()
    await invalidate('supabase:auth')
    window.location.reload()
  }
	
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class='max-w-screen-lg mx-auto'>
<div class='flex justify-between'>
<div class='text-3xl'>The Discord Awards</div>

<div class='flex gap-2'>
<Avatar.Root>
  <Avatar.Image src={user?.identities[0].identity_data.picture} alt="@shadcn" />
  <Avatar.Fallback>CN</Avatar.Fallback>
</Avatar.Root>
{#if user}
  <div>
    <Button variant="outline" onclick={signOut}>Sign Out</Button>
  </div>
{:else}
  <div>
<Button variant="outline" onclick={signInWithGoogle}>Sign In</Button>
  </div>
  {/if}
</div>
</div>

{@render children()}
</div>
