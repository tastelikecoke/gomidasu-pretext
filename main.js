import { prepareWithSegments, layoutNextLine } from '@chenglou/pretext';

console.log(WIDTH);
const container = document.getElementById('text-container');
const FONT = '20px sans-serif';
var HEIGHT = 600;
var WIDTH = 600;
const CIRCLE_RADIUS = 130;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

const text = "Pretext allows us to calculate text layouts without the DOM, but we can still use those calculations to drive DOM elements. By using layoutNextLine, we can determine exactly where a string should break to avoid the central circle. This text remains fully selectable because it consists of standard span elements. Notice how the text shifts and reflows every second as it moves from left to right. This demonstrates the power of manual layout control in high-performance web interfaces. ".repeat(4);
const cheese = "Cheese is a type of dairy product produced in a range of flavors, textures, and forms by coagulation of the milk protein casein. It is composed of proteins and fat from milk, usually of cows, goats or sheep, and sometimes of water buffalo. During production, milk is usually acidified and either the enzymes of rennet or bacterial enzymes with similar activity are added to cause the casein to coagulate. The solid curds are then separated from the liquid whey and pressed into finished cheese.[1] Some cheeses have aromatic molds on the rind, the outer layer, or throughout.\n\nOver a thousand types of cheese exist, produced in various countries. Their styles, textures and flavors depend on the origin of the milk (including the animal's diet), whether they have been pasteurised, the butterfat content, the bacteria and mold, the processing, and how long they have been aged. Herbs, spices, or wood smoke may be used as flavoring agents. Other added ingredients may include black pepper, garlic, chives or cranberries. A cheesemonger, or specialist seller of cheeses, may have expertise with selecting, purchasing, receiving, storing and ripening cheeses.[2]\n\nMost cheeses are acidified by bacteria, which turn milk sugars into lactic acid; the addition of rennet completes the curdling. Vegetarian varieties of rennet are available; most are produced through fermentation by the fungus Mucor miehei, but others have been extracted from Cynara thistles. For a few cheeses, the milk is curdled by adding acids such as vinegar or lemon juice. "
const prepared = prepareWithSegments(cheese, FONT);

function render(time) {
  const app = document.getElementById('app');
  var HEIGHT = app.clientHeight;
  var WIDTH = container.clientWidth;
  const LINE_HEIGHT = 24;
  // Movement logic: 0 to 100px every 1000ms
  const cycle = 0;// Math.sin(time / 1000);
  const xOffset = cycle * 100;
  const CENTER_X = WIDTH / 2 + xOffset;
  const CENTER_Y = HEIGHT / 3;

  // Clear the container for the new frame
  container.innerHTML = '';

  let cursor = { segmentIndex: 0, graphemeIndex: 0 };
  let y = 20;

  while (y < HEIGHT - 20) {
    const relativeY = (y + LINE_HEIGHT / 2) - CENTER_Y;
    const lineDiv = document.createElement('div');
    lineDiv.className = 'line';
    lineDiv.style.top = `${y}px`;

    // Determine if this line hits the circle
    if (Math.abs(relativeY) < CIRCLE_RADIUS) {
      const halfChord = Math.sqrt(CIRCLE_RADIUS ** 2 - relativeY ** 2);
      const circleLeft = CENTER_X - halfChord;
      const circleRight = CENTER_X + halfChord;

      // Part 1: Text before the circle
      const leftStart = 20 + (xOffset % 50); // Small movement
      const leftWidth = circleLeft - leftStart - 10;
      
      if (leftWidth > 20) {
        const line = layoutNextLine(prepared, cursor, leftWidth);
        if (line) {
          const span = document.createElement('span');
          span.textContent = line.text;
          span.style.position = 'absolute';
          span.style.left = `${leftStart}px`;
          lineDiv.appendChild(span);
          cursor = line.end;
        }
      }

      // Part 2: Text after the circle
      const rightWidth = (WIDTH - 20) - (circleRight + 10);
      if (rightWidth > 20) {
        const line = layoutNextLine(prepared, cursor, rightWidth);
        if (line) {
          const span = document.createElement('span');
          span.textContent = line.text;
          span.style.position = 'absolute';
          span.style.left = `${circleRight + 10}px`;
          lineDiv.appendChild(span);
          cursor = line.end;
        }
      }
    } else {
      // Normal full-width line
      const fullWidth = WIDTH - 40;
      const line = layoutNextLine(prepared, cursor, fullWidth);
      if (line) {
        const span = document.createElement('span');
        span.textContent = line.text;
        span.style.position = 'absolute';
        span.style.left = `${20 + (xOffset % 50)}px`;
        lineDiv.appendChild(span);
        cursor = line.end;
      }
    }

    container.appendChild(lineDiv);
    y += LINE_HEIGHT;
    if (!cursor) break;
  }

  //requestAnimationFrame(render);
}

requestAnimationFrame(render);
window.addEventListener('resize', () => {requestAnimationFrame(render)});