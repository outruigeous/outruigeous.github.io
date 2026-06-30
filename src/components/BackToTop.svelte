<script lang="ts">
  const GAP = 16; // matches right-4 / the default bottom-4 offset
  const DESKTOP_BREAKPOINT = 768; // matches Tailwind's md breakpoint used elsewhere

  let visible = $state(false);
  let bottomOffset = $state(GAP);

  $effect(() => {
    const onScroll = () => {
      visible = window.scrollY > window.innerHeight;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  $effect(() => {
    const footer = document.querySelector('footer');

    // Desktop gets a fixed, constant position docked just above the footer.
    // Since the button is viewport-fixed, this offset only ever matters once
    // the page is scrolled to the bottom (where the footer lines up with the
    // viewport edge) — anywhere else the footer is further down, off-screen,
    // so there's nothing to overlap. Mobile just keeps the plain corner offset.
    const updatePosition = () => {
      const isDesktop = window.innerWidth > DESKTOP_BREAKPOINT;
      const footerHeight = footer?.getBoundingClientRect().height ?? 0;
      bottomOffset = isDesktop ? footerHeight + GAP : GAP;
    };

    window.addEventListener('resize', updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener('resize', updatePosition);
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
  style="bottom: {bottomOffset}px"
  class="fixed right-4 z-50 flex flex-col items-center justify-center gap-1 w-[58px] h-[62px] px-1 py-2 rounded-lg bg-cream-accent-light text-vermillion shadow-sm transition-[opacity,transform] duration-200 {visible
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
