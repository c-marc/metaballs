## About

From:

<https://www.youtube.com/watch?v=PKQKIfv6yAw>

The metaballs effect is actually a hack of css filter. You need to use other trick (SVG filter ?) if you need that in another context (other colors, background)...

You can also make a dripping effect by:

- moving balls vertically
- start on top
- move to top when hitting bottom and set speed to 0 again
- adding some gravity to speedY
- make a sticky effect by only applying gravity when y>f(radius)
