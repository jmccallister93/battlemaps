from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import torch
import base64
import io
from PIL import Image
from torchvision import transforms
# from stylegan2_pytorch.model import Generator




# Load model
model = torch.hub.load('nvidia/StyleGAN', 'stylegan2')

app = FastAPI()

device = "cuda" if torch.cuda.is_available() else "cpu"

# Allow all origins to make requests to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
