import { useState } from 'react';
import s from '../style/main.module.scss'
import SizeSelector from './SizeSelector';

const BattleMapRender = (props) => {
    
    const [size, setSize] = useState('medium');

    const handleSizeChange = (event) => {
      setSize(event.target.value);
    };
  
    const getSizeWidth = () => {
      switch (size) {
        case 'small':
          return '560px';
        case 'large':
          return '1280px';
        default:
          return '960px'; // medium size
      }
    };
  
    const getSizeHeight = () => {
      switch (size) {
        case 'small':
          return '560px';
        case 'large':
          return '720px';
        default:
          return '750px'; // medium size
      }
    };

    const containerStyle = {
        width: getSizeWidth(),
        height: getSizeHeight(),
        border: '1px solid black',
      };
  
    return (
        <div className="container">
        <SizeSelector size={size} handleSizeChange={handleSizeChange} />
        <div style={containerStyle}>
          {/* Your component content */}
          Hello
        </div>
      </div>
    );
}
 
export default BattleMapRender;