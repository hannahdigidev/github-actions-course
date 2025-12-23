import os
import requests
import time

def ping_url(url, delay, max_trials):
    trials = 0

    while trials < max_trials: 
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print(f"Website {url} is reachable. s")
                return True
        execept requests.ConnectError:
            print(f"Website {url} is unreachable, Retrying in {delay} seconds....")
            time.sleep(delay)
            trials += 1
        execept requests.execeptions.MissingSchema:
            print(f"Invalid URL format: {url}. Make sure the URL has a valid schema (e.g., http:// or https://)")
            return False

    return False

def run():
    website_url = os.getenv("INPUT_URL")
    delay = int(os.getenv("INPUT_DELAY"))
    max_trials = int(os.getenv("INPUT_MAX_TRIALS"))

    website_reachable = ping_url(website_url, delay, max_trials)
    print("Hello world")

    if not website_reachable: 
        raise exeception("Website {website_url} is malformed or unreachable")
    
    print(f"website {website_url} is reachable")

if __name__ == "__main__":
    run()