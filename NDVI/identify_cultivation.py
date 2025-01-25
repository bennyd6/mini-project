import requests
import json

# Step 1: OAuth Token Generation
def get_access_token(client_id, client_secret):
    token_url = "https://services.sentinel-hub.com/oauth/token"
    payload = {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret
    }
    response = requests.post(token_url, data=payload)
    
    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        print("Failed to obtain access token:", response.status_code, response.text)
        return None

# Step 2: Define the area of interest (AOI) and request payload
def construct_payload(aoi, time_range):
    evalscript = """
    // NDVI calculation with normalization for UINT8 output
    function setup() {
        return {
            input: ["B04", "B08"],
            output: { bands: 1, sampleType: "UINT8" }
        };
    }

    function evaluatePixel(sample) {
        let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);
        let normalizedNDVI = Math.floor((ndvi + 1) * 127.5); // Normalize to 0–255
        return [normalizedNDVI];
    }
    """
    
    payload = {
        "input": {
            "bounds": {
                "geometry": aoi
            },
            "data": [
                {
                    "type": "S2L2A",
                    "dataFilter": {
                        "timeRange": time_range
                    }
                }
            ]
        },
        "output": {
            "width": 512,
            "height": 512,
            "responses": [
                {"identifier": "default", "format": {"type": "image/png"}}
            ]
        },
        "evalscript": evalscript
    }
    return payload

# Step 3: Fetch NDVI Data
def fetch_ndvi_data(access_token, payload):
    url = "https://services.sentinel-hub.com/api/v1/process"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        with open("ndvi_image.png", "wb") as f:
            f.write(response.content)
        print("NDVI image saved as 'ndvi_image.png'")
    else:
        print("Error fetching NDVI data:", response.status_code, response.text)

# Main Execution
if __name__ == "__main__":
    client_id = "c5860cae-cfce-47df-a3bd-19147de0805b"
    client_secret = "HUTvstVLsmKNt2Js8PwgNtIxfMR8XxAL"

    aoi = {
        "type": "Polygon",
        "coordinates": [[
            [78.563328, 17.577091],
            [78.563428, 17.577191],
            [78.563528, 17.577091],
            [78.563428, 17.576991],
            [78.563328, 17.577091]
        ]]
    }

    time_range = {
        "from": "2024-12-01T00:00:00Z",
        "to": "2024-12-31T23:59:59Z"
    }

    access_token = get_access_token(client_id, client_secret)
    if access_token:
        payload = construct_payload(aoi, time_range)
        fetch_ndvi_data(access_token, payload)
