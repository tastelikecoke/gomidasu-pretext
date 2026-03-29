import { prepareWithSegments, layoutNextLine } from '@chenglou/pretext';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

const text = "Pretext is a pure JavaScript library for multiline text measurement and layout. It is fast, accurate, and avoids DOM reflows. Here we are demonstrating how to wrap text around a circular obstacle in the center of the screen. As the text moves from left to right every second, Pretext recalculates the line breaks dynamically to flow around the circle. This approach is much more performant than traditional DOM-based methods because it uses pure arithmetic for the layout logic. Notice how the text segments split and adjust to maintain the circular shape in the middle. ";
const repeatText = text.repeat(5); // Make enough text to fill the area

const FONT = '20px sans-serif';
const LINE_HEIGHT = 24;
const CIRCLE_RADIUS = 120;
const CENTER_X = canvas.width / 2;
const CENTER_Y = canvas.height / 2;

// Prepare the text once (expensive pass)
const prepared = prepareWithSegments(repeatText, FONT);

function render(time) {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the central circle (obstacle)
  ctx.beginPath();
  ctx.arc(CENTER_X, CENTER_Y, CIRCLE_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = '#eee';
  ctx.fill();
  ctx.strokeStyle = '#ccc';
  ctx.stroke();

  // Animation: Move from left to right in a 1-second (1000ms) interval
  const cycle = (time % 1000) / 1000; 
  const xOffset = (cycle * 100) - 50; // Oscillate/Move text slightly

  ctx.font = FONT;
  ctx.fillStyle = '#333';
  ctx.textBaseline = 'top';

  let cursor = { segmentIndex: 0, graphemeIndex: 0 };
  let y = 20;

  // Layout lines one by one
  while (y < canvas.height - 20) {
    const relativeY = y + LINE_HEIGHT / 2 - CENTER_Y;
    let lineX = 20 + xOffset;
    let availableWidth = canvas.width - 40;

    // Calculate intersection with the circle
    if (Math.abs(relativeY) < CIRCLE_RADIUS) {
      const halfChord = Math.sqrt(CIRCLE_RADIUS ** 2 - relativeY ** 2);
      const circleLeft = CENTER_X - halfChord;
      const circleRight = CENTER_X + halfChord;

      // Layout part 1: Text to the left of the circle
      const leftWidth = circleLeft - lineX - 10; // 10px padding
      if (leftWidth > 20) {
        const line = layoutNextLine(prepared, cursor, leftWidth);
        if (line) {
          ctx.fillText(line.text, lineX, y);
          cursor = line.end;
        }
      }

      // Layout part 2: Text to the right of the circle
      // We skip the circle area and continue from the same cursor
      const rightWidth = (canvas.width - 20) - (circleRight + 10);
      if (rightWidth > 20) {
        const line = layoutNextLine(prepared, cursor, rightWidth);
        if (line) {
          ctx.fillText(line.text, circleRight + 10, y);
          cursor = line.end;
        }
      }
    } else {
      // Normal line (no circle intersection)
      const line = layoutNextLine(prepared, cursor, availableWidth);
      if (line) {
        ctx.fillText(line.text, lineX, y);
        cursor = line.end;
      }
    }

    y += LINE_HEIGHT;
    if (cursor === null) break;
  }

  requestAnimationFrame(render);
}

requestAnimationFrame(render);