import React from 'react';
import { requireContext } from 'require-context.macro';

const assetContext = requireContext('../assets', true, /\.(png|jpg|jpeg|gif|svg)$/);
const assets = assetContext.keys().map(assetContext);

const AssetGallery = () => {
  return (
    <div>
      {assets.map((asset, index) => (
        <img key={index} src={asset.default} alt={`Asset ${index + 1}`} />
      ))}
    </div>
  );
};

export default AssetGallery;