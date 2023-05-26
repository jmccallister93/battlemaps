from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import torch
import base64
import io
from PIL import Image
from torchvision import transforms
# from stylegan2_pytorch.model import Generator
import sys
sys.path.append("/home/jared/repos/battlemaps/battlemaps/src/api/stylegan2-pytorch")  # Replace with actual path
from model import Generator
import torch
import numpy as np

device = "cuda" if torch.cuda.is_available() else "cpu"
size = 1024  # Output image size of the generator
latent = 512
n_mlp = 8
channel_multiplier = 2  # Channel multiplier of the generator. config-f = 2, else = 1
ckpt = "stylegan2-ffhq-config-f.pt"  # Path to the model checkpoint

g_ema = Generator(
    size, latent, n_mlp, channel_multiplier=channel_multiplier
).to(device)
checkpoint = torch.load(ckpt)

g_ema.load_state_dict(checkpoint["g_ema"])

app = FastAPI()

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
    torch.manual_seed(seed)  # This ensures reproducibility with the same seed
    g_ema.eval()
    sample_z = torch.randn(1, latent, device=device)
    sample, _ = g_ema([sample_z])

    # Convert tensor image to PIL Image
    sample = sample[0].permute(1, 2, 0).cpu().detach().numpy()  # Make sure to select first image tensor in the batch
    img = Image.fromarray((sample * 255).astype(np.uint8))

    # Convert to base64 and return
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr = img_byte_arr.getvalue()
    return {"image": base64.b64encode(img_byte_arr).decode('ascii')}
