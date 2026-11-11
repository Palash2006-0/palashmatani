"""Original, deterministic parametric ribbon renders. No downloaded artwork.
Requires Pillow and numpy for asset authoring only; the website has no runtime dependency.
"""
from pathlib import Path
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'src/assets/art'
OUT.mkdir(parents=True, exist_ok=True)

def unit(v):
    return v / np.linalg.norm(v, axis=-1, keepdims=True)

def rgb(value):
    return np.array([int(value[i:i+2], 16) for i in (1,3,5)], dtype=float)

def render(name, primary, secondary, tilt=0):
    # A closed, twisted oval ribbon with a rounded rectangular cross-section.
    nt, ns = 540, 72
    t = np.linspace(0, 2*math.pi, nt+1)[:, None]
    p = np.linspace(0, 2*math.pi, ns+1)[None, :]
    center = np.concatenate((1.55*np.cos(t), 1.75*np.sin(t), .30*np.sin(2*t)), axis=1)
    tangent = unit(np.concatenate((-1.55*np.sin(t), 1.75*np.cos(t), .60*np.cos(2*t)), axis=1))
    radial = unit(np.concatenate((np.cos(t), np.sin(t), np.zeros_like(t)), axis=1))
    side = unit(np.cross(tangent, radial))
    radial = unit(np.cross(side, tangent))
    twist = t + .36*np.sin(2*t)
    a = np.cos(twist)*radial + np.sin(twist)*side
    b = -np.sin(twist)*radial + np.cos(twist)*side
    # Broad satin face, small rounded edge; continuous, no polygonal silhouette.
    u = np.sign(np.cos(p))*np.abs(np.cos(p))**.62
    v = np.sign(np.sin(p))*np.abs(np.sin(p))**.62
    points = center[:,None,:] + .50*u[:,:,None]*a[:,None,:] + .105*v[:,:,None]*b[:,None,:]
    x,y,z = .44, -.40, -.48+tilt
    rx=np.array([[1,0,0],[0,math.cos(x),-math.sin(x)],[0,math.sin(x),math.cos(x)]])
    ry=np.array([[math.cos(y),0,math.sin(y)],[0,1,0],[-math.sin(y),0,math.cos(y)]])
    rz=np.array([[math.cos(z),-math.sin(z),0],[math.sin(z),math.cos(z),0],[0,0,1]])
    points = points @ (rz @ ry @ rx).T
    du = np.gradient(points, axis=0)
    dv = np.gradient(points, axis=1)
    normals = unit(np.cross(du,dv))
    positions = (points[:-1,:-1]+points[1:,:-1]+points[1:,1:]+points[:-1,1:])/4
    camera_center = center @ (rz @ ry @ rx).T
    outward = points-camera_center[:,None,:]
    normals = np.where((normals*outward).sum(-1,keepdims=True)<0,-normals,normals)
    # Two material faces: lime/cobalt/orange outside, pale contrasting inside.
    key = unit(np.array([-2.5,-3.5,6.]))
    fill = unit(np.array([3.,1.,2.]))
    light = .33+.65*np.clip((normals*key).sum(-1),0,1)+.19*np.clip((normals*fill).sum(-1),0,1)
    half = unit(key+np.array([0.,0.,1.]))
    spec = np.clip((normals*half).sum(-1),0,1)**35
    # Depth-buffered triangle rasterization, with supersampling for smooth edges.
    size, scale = 1600, 298
    perspective = 7.5/(7.5-points[:,:,2])
    sx = size/2+points[:,:,0]*perspective*scale
    sy = size/2-points[:,:,1]*perspective*scale
    pixels=np.zeros((size,size,4),dtype=np.uint8)
    depth=np.full((size,size),-np.inf)
    for i in range(nt):
      for j in range(ns):
        corners=[(i,j),(i+1,j),(i+1,j+1),(i,j+1)]
        base = rgb(primary) if math.sin(float(p[0,j]+p[0,j+1])/2)>0 else rgb(secondary)
        color = [np.clip(base*light[c]+spec[c]*95,0,255) for c in corners]
        for tri in ((0,1,2),(0,2,3)):
          coords=np.array([[sx[corners[k]],sy[corners[k]],points[corners[k]][2]] for k in tri])
          lo=np.maximum(np.floor(coords[:,:2].min(0)).astype(int),0)
          hi=np.minimum(np.ceil(coords[:,:2].max(0)).astype(int),size-1)
          if np.any(lo>hi): continue
          x0,y0,z0=coords[0]; x1,y1,z1=coords[1]; x2,y2,z2=coords[2]
          denom=(y1-y2)*(x0-x2)+(x2-x1)*(y0-y2)
          if abs(denom)<.0001: continue
          yy,xx=np.mgrid[lo[1]:hi[1]+1,lo[0]:hi[0]+1]
          xx=xx+.5; yy=yy+.5
          w0=((y1-y2)*(xx-x2)+(x2-x1)*(yy-y2))/denom
          w1=((y2-y0)*(xx-x2)+(x0-x2)*(yy-y2))/denom
          w2=1-w0-w1
          zz=w0*z0+w1*z1+w2*z2
          region=depth[lo[1]:hi[1]+1,lo[0]:hi[0]+1]
          mask=(w0>=-1e-6)&(w1>=-1e-6)&(w2>=-1e-6)&(zz>region)
          region[mask]=zz[mask]
          dest=pixels[lo[1]:hi[1]+1,lo[0]:hi[0]+1]
          shade=w0[:,:,None]*color[tri[0]]+w1[:,:,None]*color[tri[1]]+w2[:,:,None]*color[tri[2]]
          dest[mask,:3]=np.clip(shade[mask],0,255).astype(np.uint8)
          dest[mask,3]=255
    canvas=Image.fromarray(pixels)
    canvas=canvas.resize((1000,1000),Image.Resampling.LANCZOS)
    canvas.save(OUT/f'{name}.webp',quality=88,method=6)
    print(name, (OUT/f'{name}.webp').stat().st_size)

if __name__ == '__main__':
    import sys
    variants = {
        'possibility': ('#EAAA00', '#3A0F34', 0),
        'exploration': ('#1558C9', '#D4FF24', .23),
        'expression': ('#FF5A0A', '#FF9553', -.28),
        'journey': ('#590907', '#E8D2B5', .12),
    }
    for name in (sys.argv[1:] or variants.keys()):
        render(name, *variants[name])
