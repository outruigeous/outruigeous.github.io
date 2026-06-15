<script lang="ts">
  interface Project {
    id: string;
    data: {
      title: string;
      tags: string[];
      coverPlaceholder?: string;
      order: number;
    };
  }

  // Props
  let { projects = [] }: { projects: Project[] } = $props();

  // State
  let searchQuery = $state('');
  let selectedTag = $state('All');

  // Compute all unique tags
  const allTags = ['All', ...new Set(projects.flatMap(p => p.data.tags))];

  // Filter projects based on search and selected tag
  let filteredProjects = $derived(
    projects.filter(project => {
      const matchesSearch = project.data.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === 'All' || project.data.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
  );

  const getTagClass = (tag: string) => {
    const normalized = tag.toLowerCase().trim();
    if (normalized.includes('research') && !normalized.includes('ops')) return 'bg-pill-peach-bg text-pill-peach-text';
    if (normalized.includes('service design')) return 'bg-pill-teal-bg text-pill-teal-text';
    if (normalized.includes('design thinking')) return 'bg-pill-blue-bg text-pill-blue-text';
    if (normalized.includes('ui design') || normalized.includes('visual')) return 'bg-pill-green-bg text-pill-green-text';
    if (normalized.includes('workshop') || normalized.includes('facilitation')) return 'bg-pill-purple-bg text-pill-purple-text';
    if (normalized.includes('research ops')) return 'bg-pill-teal-bg text-pill-teal-text';
    if (normalized.includes('design ops')) return 'bg-pill-blue-bg text-pill-blue-text';
    if (normalized.includes('pink') || normalized.includes('start')) return 'bg-pill-pink-bg text-pill-pink-text';
    return 'bg-pill-peach-bg text-pill-peach-text';
  };
</script>

<div class="space-y-6">
  <!-- Search and Tag Filters -->
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-b border-border-custom/50">
    <!-- Search Bar -->
    <div class="relative w-full md:max-w-xs">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search projects..."
        class="w-full bg-card-bg/40 border border-border-custom rounded-full px-4 py-2 text-xs focus:outline-none focus:border-vermillion focus:ring-1 focus:ring-vermillion/25 transition-all text-ink"
      />
      {#if searchQuery}
        <button 
          onclick={() => searchQuery = ''}
          class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-vermillion text-xs font-bold"
        >
          ×
        </button>
      {/if}
    </div>

    <!-- Tag Filter Buttons -->
    <div class="flex flex-wrap gap-1.5 items-center">
      {#each allTags as tag}
        <button
          onclick={() => selectedTag = tag}
          class="px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-150 border cursor-pointer
            {selectedTag === tag 
              ? 'bg-ink border-ink text-cream shadow-sm' 
              : 'bg-card-bg/30 border-border-custom text-ink-muted hover:border-ink hover:text-ink'}"
        >
          {tag}
        </button>
      {/each}
    </div>
  </div>

  <!-- Projects Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 min-h-[300px]">
    {#each filteredProjects as project (project.id)}
      <div 
        class="bg-card-bg border border-border-custom rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
      >
        <a href={`/projects/${project.id}`} class="flex flex-col h-full">
          {#if project.data.coverPlaceholder}
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
            <p class="text-[14px] sm:text-sm font-medium text-ink leading-snug mb-4 group-hover:text-vermillion transition-colors duration-150">
              {project.data.title}
            </p>
            <div class="flex flex-wrap gap-1 mt-auto">
              {#each project.data.tags as tag}
                <span class="rounded-full px-2.5 py-0.5 text-[10px] font-medium whitespace-nowrap {getTagClass(tag)}">
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
        <p class="text-sm">No projects match your search or filter criteria.</p>
        <button 
          onclick={() => { searchQuery = ''; selectedTag = 'All'; }} 
          class="mt-4 text-xs font-semibold text-vermillion hover:underline"
        >
          Reset Filters
        </button>
      </div>
    {/each}
  </div>
</div>
