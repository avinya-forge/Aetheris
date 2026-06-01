import requests
from bs4 import BeautifulSoup
import json
import os

def scrape_book(book_number):
    url = f"http://books.toscrape.com/catalogue/page-{book_number}.html"
    response = requests.get(url)

    if response.status_code != 200:
        return []

    soup = BeautifulSoup(response.content, 'html.parser')
    books = soup.find_all('article', class_='product_pod')

    book_data = []
    for book in books:
        title = book.h3.a['title']
        price = book.find('p', class_='price_color').text
        availability = book.find('p', class_='instock availability').text.strip()
        rating = book.p['class'][1]

        book_data.append({
            'title': title,
            'price': price,
            'availability': availability,
            'rating': rating
        })

    return book_data

if __name__ == '__main__':
    all_books = []
    for i in range(1, 6):
        print(f"Scraping page {i}...")
        books = scrape_book(i)
        all_books.extend(books)

    os.makedirs('data', exist_ok=True)
    with open('data/books.json', 'w') as f:
        json.dump(all_books, f, indent=4)
    print("Scraping complete. Data saved to data/books.json")
