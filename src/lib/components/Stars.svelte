<script>
	const stars = Array(50).fill(0).map((_, i) => ({
		id: i,
		top: `${Math.random() * 100}%`,
		left: `${Math.random() * 100}%`,
		delay: `${Math.random() * 2}s`
	}));
</script>

<div class="fixed inset-0 -z-10">
	{#each stars as star (star.id)}
		<div
			class="absolute h-1 w-1 rounded-full bg-white animate-twinkle"
			style="top: {star.top}; left: {star.left}; animation-delay: {star.delay};"
		/>
	{/each}
</div>