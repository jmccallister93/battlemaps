import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text, TilingSprite } from '@pixi/react';
import { useMemo } from 'react';
import grass from '../assets/GrassTile/grassTileMain.png'

// import your assets here...

export const PixiScene = () =>
{
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  return (
    <Stage>
         <TilingSprite
        image={grass}
        width={800}  // these values should be the same as your stage dimensions
        height={600}
      />
      <Sprite
        image="https://pixijs.io/pixi-react/img/bunny.png"
        x={400}
        y={270}
        anchor={{ x: 0.5, y: 0.5 }}
      />

      <Container x={400} y={330}>
        <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
      </Container>
    </Stage>
  );
};

export default PixiScene
