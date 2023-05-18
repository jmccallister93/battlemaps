// import { BlurFilter } from 'pixi.js';
// import { Stage, Container, Sprite, Text, TilingSprite } from '@pixi/react';
// import { useMemo } from 'react';


// import grass from '../assets/GrassTile/grassTileMain.png'
// import dirt from '../assets/DirtTile/dirtTileMain.png'

// // specify your tile size
// const TILE_SIZE = 32; // assuming your tiles are 32x32
// const NUM_TILES = 20;

// const grassTiles = [grass];
// const dirtTiles = [dirt];

// export const PixiScene = () =>
// {

//     const tiles = [];

//     for (let row = 0; row < NUM_TILES; row++) {
//         for (let col = 0; col < NUM_TILES; col++) {
//           // const terrainNoise = sketch.noise(col / 10, row / 10);
//           // const textureNoise = sketch.noise((col + 100) / 10, (row + 100) / 10);
          
//           let tileType;
    
//           if (terrainNoise < 0.5) {
//             const textureIndex = Math.floor(textureNoise * grassTiles.length);
//             tileType = grassTiles[textureIndex];
//           } else {
//             const textureIndex = Math.floor(textureNoise * dirtTiles.length);
//             tileType = dirtTiles[textureIndex];
//           }
    
//           const tile = (
//             <Sprite
//               key={`${row},${col}`} 
//               image={tileType}
//               x={col * TILE_SIZE}
//               y={row * TILE_SIZE}
//             />
//           );
    
//           tiles.push(tile);
//         }
//       }

//   return (
//     <Stage>
//          {tiles}
//     </Stage>
//   );
// };

// export default PixiScene
