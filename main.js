import { prepareWithSegments, layoutNextLine } from '@chenglou/pretext';

const container = document.getElementById('text-container');
const FONT = '36px serif';
var HEIGHT = 600;
var WIDTH = 600;
const CIRCLE_RADIUS = 130;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const LINE_HEIGHT = 72;
const ball = document.getElementById('circle');
var isAnimating = true;

const text = "Pretext allows us to calculate text layouts without the DOM, but we can still use those calculations to drive DOM elements. By using layoutNextLine, we can determine exactly where a string should break to avoid the central circle. This text remains fully selectable because it consists of standard span elements. Notice how the text shifts and reflows every second as it moves from left to right. This demonstrates the power of manual layout control in high-performance web interfaces. ".repeat(4);
const cheese = "Cheese is a type of dairy product produced in a range of flavors, textures, and forms by coagulation of the milk protein casein. It is composed of proteins and fat from milk, usually of cows, goats or sheep, and sometimes of water buffalo. During production, milk is usually acidified and either the enzymes of rennet or bacterial enzymes with similar activity are added to cause the casein to coagulate. The solid curds are then separated from the liquid whey and pressed into finished cheese.[1] Some cheeses have aromatic molds on the rind, the outer layer, or throughout.\n\nOver a thousand types of cheese exist, produced in various countries. Their styles, textures and flavors depend on the origin of the milk (including the animal's diet), whether they have been pasteurised, the butterfat content, the bacteria and mold, the processing, and how long they have been aged. Herbs, spices, or wood smoke may be used as flavoring agents. Other added ingredients may include black pepper, garlic, chives or cranberries. A cheesemonger, or specialist seller of cheeses, may have expertise with selecting, purchasing, receiving, storing and ripening cheeses.[2]\n\nMost cheeses are acidified by bacteria, which turn milk sugars into lactic acid; the addition of rennet completes the curdling. Vegetarian varieties of rennet are available; most are produced through fermentation by the fungus Mucor miehei, but others have been extracted from Cynara thistles. For a few cheeses, the milk is curdled by adding acids such as vinegar or lemon juice. Cheese is valued for its portability, long shelf life, and high content of fat, protein, calcium, and phosphorus. Cheese is more compact and has a longer shelf life than milk.[3] Hard cheeses, such as Cheddar and Parmesan, last longer than soft cheeses, such as Brie or goat's milk cheese. The long storage life of some cheeses, especially when encased in a protective rind, allows producers to sell when markets are favourable. Vacuum packaging of block-shaped cheeses and gas-flushing of plastic bags with mixtures of carbon dioxide and nitrogen are used for storage and mass distribution of cheeses in the 21st century,[3] compared with the paper and twine that was used in the 20th and 19th century. When the Romans began to make hard cheeses for their legionaries' supplies, a new word started to be used: formaticum, from caseus formatus, or cheese shaped in a mold. It is from this word that the French fromage, standard Italian formaggio, Catalan formatge, Breton fourmaj, and Occitan fromatge (or formatge) are derived. Of the Romance languages, Spanish, Portuguese, Romanian, Tuscan and some Southern Italian dialects use words derived from caseus (queso, queijo, caș, cacio and caso for example). The word cheese is occasionally employed, as in head cheese, to mean shaped in a mold.";
const isekai = "ヰ世界情緒。自らの歌と創作で世界を表現する、バーチャルダークシンガー。力強く儚い歌声で、”ヰ世界情緒”というキャンバスの上に闇と光、新しい物語を紡ぐ。シンガーとしてだけでなく、イラスト、ナレーション、声優など様々な方面で自らの表現をおこない、作品を創り出す、唯一無二のクリエイター。Isekaijoucho is a female Japanese virtual singer affiliated with KAMITSUBAKI STUDIO and a member of V.W.P. She is a virtual dark singer who aims to express the world through her own songs and creative works. With a voice that is both powerful and ethereal, she weaves themes of darkness and light into what is often described as “worldly sentiment.” In addition to her work as a singer, she is a multifaceted creator who expresses herself through various mediums, including illustration, narration, and voice acting. "

const streetwitch = "Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch Street Witch ";
const prepared = prepareWithSegments(isekai, FONT);

// --- Object Pooling Setup ---
const lineElements = [];
const maxLines = Math.ceil(HEIGHT*2 / LINE_HEIGHT) + 2;

// Pre-allocate the DOM nodes
for (let i = 0; i < maxLines; i++) {
  const lineDiv = document.createElement('div');
  lineDiv.className = 'line';
  lineDiv.style.position = 'absolute';
  lineDiv.style.height = `${LINE_HEIGHT}px`;
  lineDiv.style.width = '100%';
  
  // Each line gets two spans to handle the "split" around the circle
  const spanLeft = document.createElement('span');
  const spanRight = document.createElement('span');
  
  spanLeft.style.position = 'absolute';
  spanRight.style.position = 'absolute';
  
  lineDiv.appendChild(spanLeft);
  lineDiv.appendChild(spanRight);
  container.appendChild(lineDiv);
  
  lineElements.push({ div: lineDiv, left: spanLeft, right: spanRight });
}

function render(time) {
  const app = document.getElementById('app');
  var HEIGHT = app.clientHeight;
  var WIDTH = container.clientWidth;
  const LINE_HEIGHT = 72;
  // Movement logic: 0 to 100px every 1000ms
  const cycle = Math.sin(time / 2000);
  const cycle2 = Math.cos(time / 2000);
  const xOffset = 0;//cycle * 100;
  const CENTER_X = WIDTH / 2 + (cycle * 300);
  const CENTER_Y = HEIGHT / 2 - (cycle2 * 300);

  ball.style.left = `${CENTER_X / WIDTH * 100}%`;
  ball.style.top = `${CENTER_Y / HEIGHT * 100}%`;


  let cursor = { segmentIndex: 0, graphemeIndex: 0 };
  let currentY = 20;

  for (let i = 0; i < lineElements.length; i++) {
      const { div, left, right } = lineElements[i];
    // Stop if we've run out of text or space
    if (currentY > HEIGHT - 20 || !cursor) {
      div.style.display = 'none';
      continue;
    }
    div.style.display = 'block';
    div.style.transform = `translateY(${currentY}px)`;
    
    const relativeY = (currentY + LINE_HEIGHT / 2) - CENTER_Y;

    if (Math.abs(relativeY) < CIRCLE_RADIUS) {
      // Intersection Logic
      const halfChord = Math.sqrt(CIRCLE_RADIUS ** 2 - relativeY ** 2);
      const circleLeft = CENTER_X - halfChord;
      const circleRight = CENTER_X + halfChord;

      // Left Segment
      const leftStart = 20 + xOffset;
      const leftWidth = circleLeft - leftStart - 10;
      const leftLine = leftWidth > 20 ? layoutNextLine(prepared, cursor, leftWidth) : null;

      if (leftLine) {
        left.textContent = leftLine.text;
        left.style.transform = `translateX(${leftStart}px)`;
        cursor = leftLine.end;
      } else {
        left.textContent = '';
      }

      // Right Segment
      const rightWidth = (WIDTH - 20) - (circleRight + 10);
      const rightLine = rightWidth > 20 ? layoutNextLine(prepared, cursor, rightWidth) : null;

      if (rightLine) {
        right.textContent = rightLine.text;
        right.style.transform = `translateX(${circleRight + 10}px)`;
        cursor = rightLine.end;
      } else {
        right.textContent = '';
      }
    } else {
      // Full Width Line
      const fullWidth = WIDTH - 40;
      const line = layoutNextLine(prepared, cursor, fullWidth);
      
      if (line) {
        left.textContent = line.text;
        left.style.transform = `translateX(${20 + xOffset}px)`;
        right.textContent = ''; // Hide the second span
        cursor = line.end;
      }
    }

    currentY += LINE_HEIGHT;
  }

  if(isAnimating)
    requestAnimationFrame(render);
}

requestAnimationFrame(render);
window.addEventListener('resize', () => {
  requestAnimationFrame(render)
  
});

var ball1 = document.getElementById('circle');
document.addEventListener('click', () => {
  isAnimating = !isAnimating;
  requestAnimationFrame(render);
})