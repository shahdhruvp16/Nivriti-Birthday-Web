PUT NIVRITI'S DIORAMA IMAGE HERE
=================================

To make the main "world" screen look EXACTLY like the reference render you
shared, save that image into this folder (client/public/) named:

    world.png        (preferred)

Other accepted names: world.webp, world.jpg, world.jpeg
(The app checks for them in that order.)

That's it. The app detects the file automatically on load, uses it as the
diorama backdrop, and overlays invisible clickable hotspots on each object
(sunflower, evil eye, earphones, charger, chocolates, tiramisu, letter,
perfume room) so they open their messages/scenes. No code change needed.

Tips for the best result:
- Use a SQUARE image (e.g. 1200x1200). The reference render already is.
- If your image's objects don't line up perfectly with the hotspots, tell me
  and I'll nudge the hotspot coordinates in
  client/src/components/MiniatureWorld/MiniatureWorld.jsx (the HOTSPOTS map).
- You can also point to a hosted URL instead by setting VITE_WORLD_IMAGE in
  client/.env (e.g. VITE_WORLD_IMAGE=https://.../world.png).

Until an image is present, the app falls back to a built-in illustrated room
so nothing ever looks broken.
