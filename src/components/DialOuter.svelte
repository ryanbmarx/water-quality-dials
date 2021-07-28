<script>
  export let title = "";
</script>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 364 364">
  <defs
    ><style>
      .cls-1 {
        fill: none;
      }
      .cls-2 {
        clip-path: url(#outer-dial-clip-path);
      }
      .cls-3 {
        fill: #eee;
      }
      .cls-4 {
        fill: #fff;
      }
    </style>
    <clipPath id="outer-dial-clip-path">
      <circle class="cls-1" cx="182.5" cy="182.33" r="182" />
    </clipPath>
  </defs>
  {#if title}<title>{title}</title>{/if}
  <g class="cls-2">
    <rect class="cls-3" x="-5" y="-5.18" width="375.01" height="375.01" />
    <polygon points="182.5 182.33 11.6 35.1 117.8 -37.68 182.5 182.33" />
  </g>
  <circle class="cls-4" cx="182.5" cy="182.33" r="170.9" />
</svg>
