from fastapi import FastAPI
import uvicorn
import torch
import base64
import io
from PIL import Image
from torchvision import transforms

# Load model
model = torch.hub.load('nvidia/StyleGAN', 'stylegan2')

app = FastAPI()

@app.post("/generate/")
async def generate_image(seed: int):
    # Generate image
    img = model(seed)
    
    # Convert to PIL Image
    transform = transforms.ToPILImage()
    img = transform(img)
    
    # Convert to base64 and return
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()
    return {"image": base64.encodebytes(img_byte_arr).decode('ascii')}
