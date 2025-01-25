import ee

# Initialize Earth Engine
ee.Initialize()

# Define polygon (example coordinates)
polygon = ee.Geometry.Polygon([
    [[78.7282, 17.7835], [78.7295, 17.7836], [78.7300, 17.7825], [78.7285, 17.7820]]
])

# Load Sentinel-2 data and calculate NDVI
dataset = ee.ImageCollection('COPERNICUS/S2') \
    .filterBounds(polygon) \
    .filterDate('2023-01-01', '2023-12-31') \
    .map(lambda img: img.normalizedDifference(['B8', 'B4']).rename('NDVI'))

# Reduce to mean NDVI for the polygon
mean_ndvi = dataset.mean().reduceRegion(
    reducer=ee.Reducer.mean(),
    geometry=polygon,
    scale=10
).get('NDVI')

print('Mean NDVI:', mean_ndvi.getInfo())
