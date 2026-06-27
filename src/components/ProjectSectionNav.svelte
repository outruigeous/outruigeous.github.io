<script lang="ts">
  interface Heading {
    depth: number;
    slug: string;
    text: string;
  }

  let { headings = [] }: { headings: Heading[] } = $props();

  let activeId = $state<string | null>(null);

  // activeId only becomes non-null once the user has scrolled down to (or
  // past) the first heading, so it doubles as the "has reached the first
  // h2 yet" signal for revealing the nav.
  let visible = $derived(activeId !== null);

  $effect(() => {
    // Track every currently-intersecting heading, not just the latest
    // batch of entries — IntersectionObserver only reports targets whose
    // status changed, so this is needed to pick the right one when two
    // short sections are both within the trigger band at once.
    const intersecting = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.set(entry.target.id, entry);
          } else {
            intersecting.delete(entry.target.id);
          }
        }
        if (intersecting.size > 0) {
          const topEntry = [...intersecting.values()].reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          activeId = topEntry.target.id;
        }
      },
      { rootMargin: '0px 0px -75% 0px', threshold: 0 }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.slug);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });

  const scrollToSection = (slug: string) => {
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
</script>

<nav
  class="sticky top-20 flex flex-col gap-3 transition-opacity duration-300 {visible
    ? 'opacity-100'
    : 'opacity-0 pointer-events-none'}"
>
  <a
    href="/"
    class="inline-flex items-center gap-1.5 text-callout-icon transition-colors duration-150 group mb-5"
  >
    <span class="transition-transform group-hover:-translate-x-1">←</span>
    <span class="group-hover:underline">Back to home</span>
  </a>

  {#each headings as heading (heading.slug)}
    <p
      role="button"
      tabindex="0"
      onclick={() => scrollToSection(heading.slug)}
      onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          scrollToSection(heading.slug);
        }
      }}
      class="cursor-pointer transition-colors duration-150 hover:underline {activeId === heading.slug
        ? 'text-vermillion font-bold'
        : 'text-callout-icon'}"
    >
      {activeId === heading.slug ? '• ' : ''}{heading.text}
    </p>
  {/each}
</nav>
