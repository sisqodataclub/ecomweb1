import urllib.request
import json
import sys

url = "https://core.franciscodes.com/api/products/"
req = urllib.request.Request(url, headers={"X-Tenant": "web"})

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        results = data.get('results', data)
        if results and len(results) > 0:
            print(json.dumps(results[0], indent=2))
        else:
            print("No products found")
except Exception as e:
    print(f"Error: {e}")
