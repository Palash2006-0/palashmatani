"""Render the share image from the portfolio's own parametric artwork."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root=Path(__file__).resolve().parents[1]
canvas=Image.new('RGBA',(1200,630),'#0B3048')
art=Image.open(root/'src/assets/art/possibility.webp').convert('RGBA').resize((580,580),Image.Resampling.LANCZOS)
canvas.alpha_composite(art,(610,20))
draw=ImageDraw.Draw(canvas)
fonts=Path('C:/Windows/Fonts')
sans=lambda size: ImageFont.truetype(str(fonts/'segoeui.ttf'),size)
serif=lambda size: ImageFont.truetype(str(fonts/'georgiai.ttf'),size)
draw.text((65,48),'palash matani.',font=ImageFont.truetype(str(fonts/'georgia.ttf'),28),fill='#F2F0E9')
draw.text((65,165),'Software, with',font=sans(66),fill='#F2F0E9')
draw.text((65,247),'a sense of',font=sans(66),fill='#F2F0E9')
draw.text((62,328),'possibility.',font=serif(84),fill='#B9F12F')
draw.line((65,512,1135,512),fill='#426174',width=1)
draw.text((65,547),'PALASH MATANI  /  SOFTWARE & CREATIVE EXPLORATION',font=sans(17),fill='#F2F0E9')
canvas.convert('RGB').save(root/'public/social-preview.png',optimize=True)
