<script lang="ts">
  interface Project {
    id: string;
    data: {
      title: string;
      tags: string[];
      cover?: string;
      coverPlaceholder?: string;
      order: number;
    };
  }

  // Props
  let { projects = [] }: { projects: Project[] } = $props();

  // State
  let selectedTag = $state('All');

  // Compute all unique tags
  const allTags = ['All', ...new Set(projects.flatMap(p => p.data.tags))];

  // Filter projects based on selected tag
  let filteredProjects = $derived(
    projects.filter(project => selectedTag === 'All' || project.data.tags.includes(selectedTag))
  );

  const getTagClass = (tag: string) => {
    const normalized = tag.toLowerCase().trim();
    if (normalized.includes('research') && !normalized.includes('ops')) return 'bg-pill-peach-bg text-pill-peach-text';
    if (normalized.includes('service design')) return 'bg-pill-teal-bg text-pill-teal-text';
    if (normalized.includes('design thinking')) return 'bg-pill-blue-bg text-pill-blue-text';
    if (normalized.includes('ui design')) return 'bg-pill-green-bg text-pill-green-text';
    if (normalized.includes('workshop') || normalized.includes('facilitation') || normalized.includes('visual')) return 'bg-pill-purple-bg text-pill-purple-text';
    if (normalized.includes('research ops')) return 'bg-pill-pink-bg text-pill-pink-text';
    if (normalized.includes('design ops')) return 'bg-pill-blue-bg text-pill-blue-text';
    if (normalized.includes('pink') || normalized.includes('start')) return 'bg-pill-pink-bg text-pill-pink-text';
    return 'bg-pill-peach-bg text-pill-peach-text';
  };
</script>

<div class="space-y-6">
  <!-- Tag Filters -->
  <div class="flex flex-wrap gap-1.5 items-center py-2 border-b border-border-custom/50">
    {#each allTags as tag}
      <button
        onclick={() => selectedTag = tag}
        class="px-3 py-1 rounded-full caption transition-all duration-150 border cursor-pointer
          {selectedTag === tag
            ? 'bg-ink border-ink text-cream shadow-sm'
            : 'bg-card-bg/30 border-border-custom text-ink-muted hover:border-ink hover:text-ink'}"
      >
        {tag}
      </button>
    {/each}
  </div>

  <!-- Projects Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 min-h-[300px]">
    {#each filteredProjects as project (project.id)}
      <div 
        class="bg-card-bg border border-border-custom rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
      >
        <a href={`/projects/${project.id}`} class="flex flex-col h-full">
          {#if project.data.cover}
            <img
              src={project.data.cover}
              alt={`${project.data.title} Cover`}
              class="w-full aspect-[16/9] object-cover bg-border-custom group-hover:scale-[1.01] transition-transform duration-200"
            />
          {:else if project.data.coverPlaceholder}
            {#if project.data.coverPlaceholder.startsWith('/') || project.data.coverPlaceholder.startsWith('http')}
              <img
                src={project.data.coverPlaceholder}
                alt={`${project.data.title} Cover`}
                class="w-full aspect-[16/9] object-cover bg-border-custom group-hover:scale-[1.01] transition-transform duration-200"
              />
            {:else}
              <div class="w-full aspect-[16/9] bg-gradient-to-br from-border-custom to-[#DDD8CC] flex items-center justify-center text-xs text-ink-muted select-none group-hover:bg-[#d6d0c2] transition-colors duration-200">
                {project.data.coverPlaceholder}
              </div>
            {/if}
          {:else}
            <div class="w-full aspect-[16/9] bg-gradient-to-br from-border-custom to-[#DDD8CC] flex items-center justify-center text-xs text-ink-muted select-none group-hover:bg-[#d6d0c2] transition-colors duration-200">
              Cover image
            </div>
          {/if}
          
          <div class="p-5 flex-grow flex flex-col justify-between">
            <p class="card-title text-ink mb-4 group-hover:text-vermillion transition-colors duration-150">
              {project.data.title}
            </p>
            <div class="flex flex-wrap gap-1 mt-auto">
              {#each project.data.tags as tag}
                <span class="rounded-full px-2.5 py-0.5 caption whitespace-nowrap {getTagClass(tag)}">
                  {tag}
                </span>
              {/each}
            </div>
          </div>
        </a>
      </div>
    {:else}
      <div class="col-span-full flex flex-col items-center justify-center py-20 text-ink-muted bg-card-bg/20 border border-dashed border-border-custom rounded-2xl">
        <span class="text-2xl mb-2">🔍</span>
        <p class="text-sm">No projects match your filter criteria.</p>
        <button
          onclick={() => { selectedTag = 'All'; }}
          class="mt-4 text-xs font-semibold text-vermillion hover:underline"
        >
          Reset Filters
        </button>
      </div>
    {/each}
  </div>
</div>
