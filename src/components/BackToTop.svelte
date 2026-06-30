<script lang="ts">
  let visible = $state(false);

  $effect(() => {
    const threshold = () => window.innerHeight;

    const onScroll = () => {
      visible = window.scrollY > threshold();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
</script>

<button
  type="button"
  aria-label="Back to top"
  onclick={scrollToTop}
  class="fixed bottom-4 right-4 z-50 flex flex-col items-center justify-center gap-1 w-[58px] h-[62px] px-1 py-2 rounded-lg bg-cream-accent-light text-vermillion shadow-sm transition-all duration-200 {visible
    ? 'opacity-100 translate-y-0 pointer-events-auto'
    : 'opacity-0 translate-y-2 pointer-events-none'}"
>
  <iconify-icon icon="tabler:arrow-up-bar" class="text-[20px]"></iconify-icon>
  <span class="font-sans text-[12px] font-bold uppercase leading-[1.15] text-center">Back<br />to top</span>
</button>

<style>
  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
  }
</style>
