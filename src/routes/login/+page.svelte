<script lang="ts">
	import { supabaseClient } from '$lib/supabase/client';

	async function signInWithGoogle() {
		const { error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback`
			}
		});
		if (error) console.error(error);
	}
</script>

<div>
	<h1>Login</h1>
	<button on:click={signInWithGoogle}>Sign in with Google</button>
</div>
