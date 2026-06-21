#!/usr/bin/env python3
"""
Script to generate favicon.ico with DM logo matching the header design
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
except ImportError:
    print("PIL not installed. Install with: pip install Pillow")
    exit(1)

def create_favicon():
    # Colors from your CSS (converted to RGB)
    primary_color = (38, 45, 68)  # hsl(224, 30%, 8%) approximation
    text_color = (255, 255, 255)  # white
    shadow_color = (20, 24, 34)   # darker version for shadow
    
    # Create different sizes
    sizes = [16, 32, 48]
    images = []
    
    for size in sizes:
        # Create image with transparency
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Draw rounded rectangle background
        border_radius = max(2, int(size * 0.2))
        
        # Main background
        draw.rounded_rectangle(
            [(0, 0), (size-1, size-1)],
            radius=border_radius,
            fill=primary_color
        )
        
        # Add shadow effect at bottom
        shadow_height = int(size * 0.3)
        draw.rounded_rectangle(
            [(0, size - shadow_height), (size-1, size-1)],
            radius=border_radius,
            fill=shadow_color
        )
        
        # Add text
        try:
            # Try to use a bold font
            font_size = int(size * 0.4)
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            try:
                font = ImageFont.load_default()
            except:
                font = None
        
        text = "DM"
        
        if font:
            # Get text dimensions
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
        else:
            # Fallback dimensions
            text_width = size * 0.6
            text_height = size * 0.4
        
        # Center the text
        x = (size - text_width) // 2
        y = (size - text_height) // 2
        
        draw.text((x, y), text, fill=text_color, font=font)
        
        images.append(img)
    
    # Save as ICO file
    if images:
        images[0].save(
            'public/favicon.ico',
            format='ICO',
            sizes=[(img.size[0], img.size[1]) for img in images],
            append_images=images[1:]
        )
        print("favicon.ico created successfully!")
        
        # Also save individual PNG files for reference
        for i, (size, img) in enumerate(zip(sizes, images)):
            img.save(f'favicon-{size}.png', format='PNG')
            print(f"favicon-{size}.png created!")
    else:
        print("No images created")

if __name__ == "__main__":
    create_favicon()