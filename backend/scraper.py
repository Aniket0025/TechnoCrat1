import requests
from bs4 import BeautifulSoup
from typing import List, Dict

# Example: Scrape eco-friendly products from EarthHero (adjust selectors as needed)
def scrape_earthhero() -> List[Dict]:
    url = "https://earthhero.com/collections/all"
    print(f"Fetching {url}")
    products = []
    try:
        resp = requests.get(url, timeout=10)
        print("Status code:", resp.status_code)
        print("First 500 chars of HTML:", resp.text[:500])
        soup = BeautifulSoup(resp.text, "html.parser")
        for item in soup.select(".boost-pfs-filter-product-item"):
            print("Found a product card")
            try:
                img_elem = item.select_one(".boost-pfs-filter-product-item-flip-image")
                img = None
                if img_elem:
                    img = img_elem.get('data-src') or img_elem.get('src')
                title_elem = item.select_one(".boost-pfs-filter-product-title")
                if title_elem:
                    title = title_elem.text.strip()
                elif img_elem and img_elem.get('alt'):
                    title = img_elem.get('alt').strip()
                else:
                    title = f"Untitled Product #{len(products)+1}"
                price_elem = item.select_one(".boost-pfs-filter-product-item-sale-price")
                price = price_elem.text.strip().replace("$", "") if price_elem and price_elem.text else "0"
                brand_elem = item.select_one(".boost-pfs-filter-product-vendor")
                brand = brand_elem.text.strip() if brand_elem else "No brand"
                url_elem = item.select_one("a")
                url = url_elem['href'] if url_elem and url_elem.has_attr('href') else ""
                desc = ""
                materials = []
                badges = []
                print(f"Parsed product: title={title}, price={price}, brand={brand}, img={img}, url={url}")
                products.append({
                    "title": title,
                    "price": float(price) if price else 0.0,
                    "brand": brand,
                    "materials": materials,
                    "description": desc,
                    "url": url,
                    "image": img,
                    "badges": badges,
                    "source": "EarthHero"
                })
            except Exception as e:
                print(f"Error parsing product: {e}")
    except Exception as e:
        print(f"Scraping failed: {e}")

    # Fallback: If no products were scraped, provide sample products
    if not products:
        print("No products scraped. Returning fallback sample products.")
        products = [
            {
                "title": "Organic Cotton T-Shirt",
                "price": 24.99,
                "brand": "EcoWear",
                "materials": ["100% organic cotton", "water-based dyes"],
                "description": "Soft, sustainable, and stylish.",
                "url": "https://example.com/organic-cotton-tshirt",
                "image": "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&q=80",
                "badges": ["Fair Trade"],
                "source": "SampleData"
            },
            {
                "title": "Reusable Glass Water Bottle",
                "price": 28.50,
                "brand": "GreenHydro",
                "materials": ["Sustainable glass", "silicone grip"],
                "description": "Stay hydrated sustainably.",
                "url": "https://example.com/reusable-glass-bottle",
                "image": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
                "badges": ["Carbon Neutral"],
                "source": "SampleData"
            },
            {
                "title": "Biodegradable Phone Case",
                "price": 27.50,
                "brand": "EcoTech",
                "materials": ["Biodegradable bioplastic", "plant fibers"],
                "description": "Protect your phone and the planet.",
                "url": "https://example.com/biodegradable-phone-case",
                "image": "https://images.unsplash.com/photo-1609252924198-30b8cb324d2f?w=500&q=80",
                "badges": ["Plastic Free"],
                "source": "SampleData"
            }
        ]
    print(f"Total products returned: {len(products)}")
    return products

if __name__ == "__main__":
    results = scrape_earthhero()
    for product in results:
        print(product)
