import { prepareWithSegments, layoutNextLine } from '@chenglou/pretext';

const container = document.getElementById('text-container');
const WIDTH = 600;
const HEIGHT = 600;
const FONT = '20px sans-serif';
const LINE_HEIGHT = 24;
const CIRCLE_RADIUS = 120;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;

const text = "Pretext allows us to calculate text layouts without the DOM, but we can still use those calculations to drive DOM elements. By using layoutNextLine, we can determine exactly where a string should break to avoid the central circle. This text remains fully selectable because it consists of standard span elements. Notice how the text shifts and reflows every second as it moves from left to right. This demonstrates the power of manual layout control in high-performance web interfaces. ".repeat(4);

const prepared = prepareWithSegments(text, FONT);

function render(time) {
  // Movement logic: 0 to 100px every 1000ms
  const cycle = Math.sin(time / 1000);
  const xOffset = cycle * 100;

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

  requestAnimationFrame(render);
}

requestAnimationFrame(render);