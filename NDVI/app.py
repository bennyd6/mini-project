import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

# Load the NDVI image
image_path = "/ndvi_image.png"
ndvi_image = Image.open(image_path).convert("L")  # Convert to grayscale

# Convert image to numpy array
ndvi_array = np.array(ndvi_image)

# Normalize the array values to range from -1 to 1 (assuming NDVI range)
ndvi_normalized = (ndvi_array / 255.0) * 2 - 1

# Define thresholds for classification
cultivated_threshold = 0.4  # NDVI > 0.4 is considered cultivated

# Create a color map
# Values below cultivated_threshold are red (barren land), values above are green (cultivated)
color_mapped_image = np.zeros((ndvi_normalized.shape[0], ndvi_normalized.shape[1], 3))

# Apply color mapping
color_mapped_image[ndvi_normalized < cultivated_threshold] = [1, 0, 0]  # Red for uncultivated land
color_mapped_image[ndvi_normalized >= cultivated_threshold] = [0, 1, 0]  # Green for cultivated land

# Plot and save the color-mapped image
plt.figure(figsize=(10, 10))
plt.imshow(color_mapped_image)
plt.title("NDVI Classification: Cultivated (Green) vs Uncultivated (Red)")
plt.axis("off")
plt.show()

# Save the result as a new image
output_path = "/mnt/data/ndvi_classification.png"
plt.imsave(output_path, color_mapped_image)
print(f"Color-mapped NDVI image saved at: {output_path}")
