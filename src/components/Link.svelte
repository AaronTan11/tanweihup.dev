<script lang="ts">
  let href: string;

  $: isExternal = href ? href.startsWith("http") : false;
</script>

<a
  href={href}
  target={isExternal ? '_blank' : '_self'}
  class="underline decoration-neutral-600 underline-offset-4 transition-colors focus:(decoration-neutral-500 outline-offset-6) hover:decoration-neutral-500"
>
  <slot />
</a>
